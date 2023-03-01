<script setup lang="ts">
import VanDrag from '..';
import VanButton from '../../button';
import { useTranslate } from '../../../docs/site';
import { DragBoundary } from '../types';
import { CSSProperties } from 'vue';

const t = useTranslate({
  'zh-CN': {
    sticky: '自动吸边',
    speed: '设置吸边速度',
    restrict: '限制拖拽区域',
    direction: '限制拖拽方向',
    horizontal: '限制水平拖拽',
    vertical: '限制竖直拖拽',
  },
  'en-US': {
    sticky: 'auto sticky',
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
const click = () => {
  console.log('点击了');
};
</script>

<template>
  <demo-block :title="t('basicUsage')" class="block">
    <van-drag>
      <van-button type="primary" text="拖拽" />
    </van-drag>
  </demo-block>

  <demo-block :title="t('direction')" class="block">
    <van-drag speed="300" direction="horizontal">
      <van-button :text="t('horizontal')" type="primary" />
    </van-drag>
    <van-drag
      speed="300"
      direction="vertical"
      :style="{ left: '130px' }"
      sticky
    >
      <van-button :text="t('vertical')" type="primary" />
    </van-drag>
  </demo-block>

  <demo-block :title="t('sticky')" class="block">
    <van-drag sticky @click.stop="click">
      <van-button :text="t('sticky')" type="primary" />
    </van-drag>
    <van-drag speed="10" sticky :style="{ left: '130px' }" @click.stop="click">
      <van-button :text="t('speed')" type="primary" />
    </van-drag>
  </demo-block>

  <demo-block :title="t('restrict')">
    <van-drag :boundary="boundary" sticky z-index="443">
      <van-button :text="t('restrict')" type="primary" />
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
