# Drag 拖拽

### 介绍

可拖拽组件。由于内部使用了 `touch-move` 等事件，建议在移动端体验完备功能。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { Drag } from 'vant';

const app = createApp();
app.use(Drag);
```

## 代码演示

### 基础用法

```html
<van-drag>
  <van-button text="拖拽" @click="click" />
</van-drag>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const click = () => {
      showToast('点击');
    };

    return { click };
  },
};
```

### 限制拖拽移动方向

Empty 组件内置了多种占位图片类型，可以在不同业务场景下使用。

```html
<!-- 限制拖拽水平移动 -->
<!-- 限制拖拽竖直移动 -->
```

### 自动吸边

设置 `sticky` 属性可使组件在拖拽后自动左右吸边。

```html

```

设置 `speed` 属性可调整拖拽释放后吸边的移动速度，默认为 `100px/s (60Hz屏幕)`

```html

```

### 限制拖拽区域

设置 `boundary` 属性可限制拖拽区域。

```html

```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 拖拽方向，可选值为 `vertical`、 `horizontal` | _string_ | `any` |
| boundary | 限制拖拽区域 | _object_ | - |
| sticky | 是否自动吸边 | _boolean_ | `false` |
| speed | 吸边速度 | _number \| string_ | `1000` |
| zIndex | z-index | _number \| string_ | `999` |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 拖拽内容 |

### 类型定义

组件导出以下类型定义：

```ts
import type { EmptyProps } from 'vant';
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称                                | 默认值                      | 描述 |
| ----------------------------------- | --------------------------- | ---- |
| --van-empty-padding                 | _var(--van-padding-xl) 0_   | -    |
| --van-empty-image-size              | _160px_                     | -    |
| --van-empty-description-margin-top  | _var(--van-padding-md)_     | -    |
| --van-empty-description-padding     | _0 60px_                    | -    |
| --van-empty-description-color       | _var(--van-text-color-2)_   | -    |
| --van-empty-description-font-size   | _var(--van-font-size-md)_   | -    |
| --van-empty-description-line-height | _var(--van-line-height-md)_ | -    |
| --van-empty-bottom-margin-top       | _24px_                      | -    |
