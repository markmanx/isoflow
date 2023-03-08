import { MachineConfig } from "xstate";
import type { Events, Context } from "./types";

export const Select: MachineConfig<Context, any, Events> = {
  id: "#Select",
  initial: "HOVERING",
  states: {
    HOVERING: {
      entry: (ctx) => {
        ctx.renderer?.sceneElements.cursor.enable();
      },
      exit: (ctx) => {
        ctx.renderer?.sceneElements.cursor.disable();
      },
      on: {
        MOUSE_MOVE: {
          actions: (ctx, data) => {
            if (!ctx.renderer) return;

            const tile = ctx.renderer.getTileFromMouse(
              data.position.x,
              data.position.y
            );

            ctx.renderer.sceneElements.cursor.displayAt(tile.x, tile.y);
          },
        },
      },
    },
  },
};
