import { MachineConfig } from "xstate";
import type { Events, Context } from "./types";

const changeCursor = (cursorType: string) => (ctx: Context) => {
  if (ctx.renderer)
    ctx.renderer.domElements.container.style.cursor = cursorType;
};

export const Pan: MachineConfig<Context, any, Events> = {
  id: "Pan",
  initial: "IDLE",
  entry: changeCursor("grab"),
  exit: changeCursor("default"),
  states: {
    IDLE: {
      on: {
        MOUSE_DOWN: {
          target: "PANNING",
        },
      },
    },
    PANNING: {
      entry: changeCursor("grabbing"),
      exit: changeCursor("grab"),
      on: {
        MOUSE_MOVE: {
          actions: (ctx, data) => {
            ctx.renderer?.scrollToDelta(data.delta.x, data.delta.y);
          },
        },
        MOUSE_UP: {
          target: "IDLE",
        },
      },
    },
  },
};
