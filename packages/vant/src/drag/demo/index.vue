<script setup lang="ts">
import VanDrag from '..';
import VanButton from '../../button';
import { useTranslate } from '../../../docs/site';
import { DragBoundary } from '../types';
import { CSSProperties } from 'vue';

const t = useTranslate({
  'zh-CN': {
    drag: '拖拽',
    click: '点击',
    sticky: '自动吸边',
    speed: '设置吸边速度',
    restrict: '限制拖拽区域',
    direction: '限制拖拽方向',
    horizontal: '限制水平拖拽',
    vertical: '限制竖直拖拽',
  },
  'en-US': {
    drag: 'Drag',
    click: 'Clicked',
    sticky: 'Auto Sticky',
    speed: 'Customized Speed',
    restrict: 'Restrict Dragging Area',
    direction: 'Restrict Dragging Direction',
    horizontal: 'Horizontal Only',
    vertical: 'Vertical Only',
  },
});
const boundary: DragBoundary = {
  top: 430,
  left: 10,
  right: 100,
  bottom: 100,
};

const boundaryStyle: CSSProperties = {
  top: `${boundary.top}px`,
  left: `${boundary.left}px`,
  right: `${boundary.right}px`,
  bottom: `${boundary.bottom}px`,
};

const clickDrag = () => {
  console.log('点击拖拽');
};

const clickBtn = () => {
  console.log('点击按钮');
};
</script>

<template>
  <demo-block :title="t('basicUsage')" class="block">
    <van-drag @click="clickDrag">
      <van-button :text="t('drag')" @click="clickBtn" />
    </van-drag>
  </demo-block>

  <demo-block :title="t('direction')" class="block">
    <van-drag direction="horizontal">
      <van-button :text="t('horizontal')" />
    </van-drag>
    <van-drag direction="vertical" :style="{ left: '150px' }">
      <van-button :text="t('vertical')" />
    </van-drag>
  </demo-block>

  <demo-block :title="t('sticky')" class="block">
    <van-drag sticky>
      <van-button :text="t('sticky')" />
    </van-drag>
    <van-drag sticky speed="1" :style="{ left: '130px' }">
      <van-button :text="t('speed')" />
    </van-drag>
  </demo-block>

  <demo-block :title="t('restrict')">
    <van-drag :boundary="boundary" sticky z-index="443">
      <van-button :text="t('restrict')" />
    </van-drag>
    <div
      :style="{ position: 'fixed', border: '1px solid red', ...boundaryStyle }"
    />
  </demo-block>
</template>

<style lang="less" scoped>
.block {
  height: 100px;
}
.border {
  position: fixed;
  top: 430px;
  left: 100px;
  right: 100px;
  bottom: 100px;
  border: 1px solid red;
}
</style>
