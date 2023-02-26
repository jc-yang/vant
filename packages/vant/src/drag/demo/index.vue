<script setup lang="ts">
import VanDrag from '..';
import VanButton from '../../button';
import { useTranslate } from '../../../docs/site';
import { DragBoundary } from '../types';

const t = useTranslate({
  'zh-CN': {
    sticky: '自动吸边',
    restrict: '限制拖拽区域',
  },
  'en-US': {
    sticky: 'auto sticky',
  },
});
const boundary: DragBoundary = {
  top: 350,
  left: 100,
  right: 100,
  bottom: 100,
};
</script>

<template>
  <demo-block :title="t('basicUsage')" class="block">
    <van-drag>
      <van-button type="primary" text="拖拽" />
    </van-drag>
  </demo-block>

  <demo-block :title="t('sticky')" class="block">
    <van-drag sticky duration="0.1">
      <van-button type="primary" :text="t('sticky')" />
    </van-drag>
  </demo-block>

  <demo-block :title="t('restrict')">
    <van-drag z-index="443" :boundary="boundary">
      <van-button type="primary" :text="t('restrict')" />
    </van-drag>
    <div class="border" />
  </demo-block>
</template>

<style lang="less" scoped>
.block {
  height: 100px;
}
.border {
  position: fixed;
  top: 350px;
  left: 100px;
  right: 100px;
  bottom: 100px;
  border: 1px solid red;
}
</style>
