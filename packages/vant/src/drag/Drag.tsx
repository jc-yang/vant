import {
  computed,
  type CSSProperties,
  defineComponent,
  type ExtractPropTypes,
  getCurrentInstance,
  onMounted,
  type PropType,
  reactive,
  ref,
} from 'vue';

import {
  addUnit,
  createNamespace,
  extend,
  getZIndexStyle,
  makeNumericProp,
  makeStringProp,
  numericProp,
  preventDefault,
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
    const elWidth = ref<number>(0);
    const elHeight = ref<number>(0);
    const viewportWidth = ref<number>(0);
    const viewportHeight = ref<number>(0);
    const startTop = ref<number>(0);
    const startLeft = ref<number>(0);
    const position = reactive({ x: 0, y: 0 });
    let rafId: number | undefined;

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
    };

    onMounted(() => {
      init();
    });

    const onTouchStart = (e: TouchEvent) => {
      // preventDefault(e, true)
      // e.preventDefault();
      // e.stopPropagation();
      const target = e.currentTarget as HTMLElement;
      startTop.value = target.offsetTop;
      startLeft.value = target.offsetLeft;
      position.x = e.touches[0].clientX;
      position.y = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      preventDefault(e, true);
      const { boundary } = props;
      const target = e.currentTarget as HTMLDivElement;
      const touch = e.targetTouches[0];
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

    const smoothMove = (to: number) => {
      const { duration } = props;
      const frames = +duration === 0 ? 1 : Math.round((+duration * 1000) / 16);
      let currX = $el.value!.offsetLeft;
      const step = (to - currX) / frames;
      const isToLeft = step < 0;
      console.log(rafId);

      function animate() {
        currX += step;
        const unfinished = isToLeft ? currX >= to : currX <= to;
        if (unfinished) {
          $el.value!.style.left = addUnit(currX)!;
          rafId = raf(animate);
        }
      }
      animate();
    };

    const moveToLeft = () => {
      const to = props.boundary.left;
      smoothMove(to);
    };

    const moveToRight = () => {
      const to = viewportWidth.value - elWidth.value - props.boundary.right;
      smoothMove(to);
    };

    const onTouchEnd = (e: TouchEvent) => {
      // preventDefault(e, true)
      const { boundary, direction, sticky } = props;
      const touch = e.changedTouches[0];
      const maxX = viewportWidth.value - elWidth.value - boundary.right;
      let curX = touch.clientX;
      if (curX > maxX) {
        curX = maxX;
      } else if (curX < boundary.left) {
        curX = boundary.left;
      }

      if (direction !== 'vertical' && sticky) {
        console.log('curx', curX, viewportWidth.value >> 1);
        if (curX < viewportWidth.value >> 1) {
          console.log('left');
          moveToLeft();
        } else {
          console.log('right');
          moveToRight();
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
