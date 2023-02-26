import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  reactive,
  computed,
  type ExtractPropTypes,
  type PropType,
  type CSSProperties,
} from 'vue';

import {
  addUnit,
  createNamespace,
  extend,
  getZIndexStyle,
  makeNumericProp,
  makeStringProp,
  numericProp,
} from '../utils';

import type { DragBoundary, DragDirection } from './types';
import { raf } from '@vant/use';

const [name, bem] = createNamespace('drag');

const DEFAULT_BOUNDARY_DATA: Readonly<DragBoundary> = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export const dragProps = {
  direction: makeStringProp<DragDirection>('any'),
  boundary: {
    type: Object as PropType<DragBoundary>,
    default: () => extend({}, DEFAULT_BOUNDARY_DATA),
  },
  sticky: Boolean,
  duration: makeNumericProp(0.3),
  zIndex: numericProp,
};

export type DragProps = ExtractPropTypes<typeof dragProps>;

export default defineComponent({
  name,

  props: dragProps,

  setup(props, { slots }) {
    const $el = ref<HTMLDivElement>();
    console.log('ccccc', $el);
    const elWidth = ref<number>(0);
    const elHeight = ref<number>(0);
    const viewportWidth = ref<number>(0);
    const viewportHeight = ref<number>(0);
    const startTop = ref<number>(0);
    const startLeft = ref<number>(0);
    const position = reactive({ x: 0, y: 0 });

    const style = computed<CSSProperties>(() => {
      const { zIndex, boundary } = props;
      const style: CSSProperties = extend({}, getZIndexStyle(zIndex));
      if (boundary.left) {
        style.left = addUnit(boundary.left);
      } else if (boundary.right) {
        style.right = addUnit(boundary.right);
      }
      if (boundary.top) {
        style.top = addUnit(boundary.top);
      } else if (boundary.bottom) {
        style.bottom = addUnit(boundary.bottom);
      }
      return style;
    });

    const init = () => {
      $el.value = getCurrentInstance()!.proxy!.$el as HTMLDivElement;
      const docEle = document.documentElement;
      elWidth.value = $el.value.offsetWidth;
      elHeight.value = $el.value.offsetHeight;
      viewportWidth.value = docEle.clientWidth;
      viewportHeight.value = docEle.clientHeight;

      console.log(
        'aaaaa',
        $el,
        elWidth.value,
        elHeight.value,
        viewportWidth.value,
        viewportHeight.value
      );
    };

    onMounted(() => {
      init();
    });

    const onTouchStart = (e: TouchEvent) => {
      const target = e.currentTarget as HTMLElement;
      console.log('=====', target === $el.value);
      startTop.value = target.offsetTop;
      startLeft.value = target.offsetLeft;
      position.x = e.touches[0].clientX;
      position.y = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const { boundary } = props;
      const target = e.currentTarget as HTMLDivElement;
      const touch = e.targetTouches[0];
      console.log('movvvvv', e);
      const shiftX = touch.clientX - position.x;
      const shiftY = touch.clientY - position.y;
      let newX = startLeft.value + shiftX;
      let newY = startTop.value + shiftY;

      const maxX = viewportWidth.value - elWidth.value - boundary.right;
      if (newX > maxX) {
        newX = maxX;
      } else if (newX < boundary.left) {
        newX = boundary.left;
      }

      const maxY = viewportHeight.value - elHeight.value - boundary.bottom;
      if (newY > maxY) {
        newY = maxY;
      } else if (newY < boundary.top) {
        newY = boundary.top;
      }

      if (props.direction !== 'horizontal') {
        target.style.top = addUnit(newY)!;
      }
      if (props.direction !== 'vertical') {
        target.style.left = addUnit(newX)!;
      }
    };

    const goToLeft = () => {
      const { boundary, duration } = props;
      const frames = +duration === 0 ? 1 : Math.round((+duration * 1000) / 16);
      const currX = $el.value!.offsetLeft;
      console.log('dddd', duration);
      console.log('ffff', frames);
      console.log(currX - frames);
      if (boundary.left) {
        if (currX > boundary.left) {
          $el.value!.style.left = addUnit(currX - frames)!;
          raf(goToLeft);
        } else {
          $el.value!.style.left = addUnit(boundary.left)!;
        }
      } else if (currX > frames) {
        $el.value!.style.left = addUnit(currX - frames)!;
        raf(goToLeft);
      } else {
        $el.value!.style.left = addUnit(0)!;
      }
    };

    const goToRight = () => {
      const { boundary, duration } = props;
      const frames = +duration === 0 ? 1 : Math.round((+duration * 1000) / 16);
      const currX = $el.value!.offsetLeft;
      console.log('dddd', duration);
      console.log('ffff', frames);
      console.log(currX - frames);
      const maxX = viewportWidth.value - elWidth.value - boundary.right;
      if (maxX - currX > frames) {
        $el.value!.style.left = addUnit(currX + frames)!;
        raf(goToRight);
      } else {
        $el.value!.style.left = addUnit(maxX)!;
      }
    };
    // todo: 动画duration不完善
    const onTouchEnd = (e: TouchEvent) => {
      const { boundary, direction, sticky } = props;
      const touch = e.changedTouches[0];
      console.log('ttttt', e);
      const maxX = viewportWidth.value - elWidth.value - boundary.right;
      let curX = touch.clientX;
      if (curX > maxX) {
        curX = maxX;
      } else if (curX < boundary.left) {
        curX = boundary.left;
      }

      if (direction !== 'vertical' && sticky) {
        if (curX < viewportWidth.value >> 1) {
          goToLeft();
        } else {
          goToRight();
        }
      }
    };

    const renderContent = () => {
      if (slots.default) {
        return slots.default();
      }
    };

    return () => (
      <div
        class={bem()}
        style={style.value}
        onTouchstart={onTouchStart}
        onTouchmove={onTouchMove}
        onTouchend={onTouchEnd}
      >
        {renderContent()}
      </div>
    );
  },
});
