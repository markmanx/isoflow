import { ModeBase } from "./ModeBase";
import { Mouse } from "./types";
import { Renderer } from "../renderer/Renderer";

const changeCursor = (cursorType: string, renderer: Renderer) => {
  renderer.domElements.container.style.cursor = cursorType;
};

export class Pan extends ModeBase {
  isPanning = false;

  entry() {
    changeCursor("grab", this.ctx.renderer);
  }

  exit() {
    changeCursor("default", this.ctx.renderer);
  }

  MOUSE_DOWN() {
    if (!this.isPanning) {
      this.isPanning = true;
      changeCursor("grabbing", this.ctx.renderer);
    }
  }

  MOUSE_UP() {
    if (this.isPanning) {
      this.isPanning = false;
      changeCursor("grab", this.ctx.renderer);
    }
  }

  MOUSE_MOVE(mouse: Mouse) {
    if (this.isPanning && mouse.delta !== null) {
      this.ctx.renderer.scrollToDelta(mouse.delta.x, mouse.delta.y);
    }
  }
}
