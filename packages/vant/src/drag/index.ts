import { withInstall } from '../utils';
import _Drag from './Drag';

export const Drag = withInstall(_Drag);
export default Drag;
export { dragProps } from './Drag';
export type { DragProps } from './Drag';
export type { DragBoundary, DragDirection } from './types';

declare module 'vue' {
  export interface GlobalComponents {
    VanDrag: typeof Drag;
  }
}
