# Drag 拖拽

### 介绍

可拖拽组件。

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

将内容包裹在 `Drag` 组件内即可。

```html
<van-drag>
  <van-button text="拖拽" />
</van-drag>
```

### 限制拖拽方向

设置 `direction` 属性可限制拖拽组件仅水平移动或竖直移动。

```html
<!-- 限制拖拽水平移动 -->
<van-drag direction="horizontal">
  <van-button text="限制水平拖拽" />
</van-drag>

<!-- 限制拖拽竖直移动 -->
<van-drag direction="vertical">
  <van-button text="限制竖直拖拽" />
</van-drag>
```

### 自动吸边

设置 `sticky` 属性可使组件在拖拽结束后自动左右吸边。

```html
<van-drag sticky>
  <van-button text="自动吸边" />
</van-drag>
```

同时，设置 `speed` 属性可调整拖拽释放后吸边的移动速度，默认为 `1000px/s (60Hz屏幕)`

```html
<van-drag sticky speed="10">
  <van-button text="设置吸边速度" />
</van-drag>
```

### 限制拖拽区域

设置 `boundary` 属性可限制拖拽区域。

```html
<van-drag :boundary="boundary" sticky>
  <van-button text="限制拖拽区域" />
</van-drag>
<div
  :style="{ position: 'fixed', border: '1px solid red', ...boundaryStyle }"
/>
```

```js
import type { DragBoundary } from 'vant';
import type { CSSProperties } from 'vue';
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
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 拖拽方向，可选值为 `vertical`、 `horizontal` | _string_ | `any` |
| boundary | 限制拖拽区域 | _object_ | - |
| sticky | 是否自动吸边 | _boolean_ | `false` |
| speed | 吸边速度，仅在 `sticky` 为 `true` 时有效，单位 px/s (以 60Hz 屏幕为基准)。值为 0 时无动画效果。 | _number \| string_ | `1000` |
| z-index | 设置拖拽组件的 z-index | _number \| string_ | `999` |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 拖拽内容 |

### 类型定义

组件导出以下类型定义：

```ts
import type { DragProps, DragBoundary, DragDirection } from 'vant';
```
