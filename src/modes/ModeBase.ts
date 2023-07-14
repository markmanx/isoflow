import { ModeContext, Mouse } from '../types';

export class ModeBase {
  ctx;

  constructor(ctx: ModeContext) {
    this.ctx = ctx;
  }

  entry(mouse: Mouse) {}

  exit() {}
}
