import { Select } from "./Select";
import { Pan } from "./Pan";
import { createMachine, assign } from "xstate";
import { Events, Context } from "./types";

export const EditorMachine = createMachine({
  id: "Editor",
  initial: "UNINITIALISED",
  on: {
    SWITCH_TO_SELECT: {
      target: "SELECT_MODE",
    },
    SWITCH_TO_PAN: {
      target: "PAN_MODE",
    },
  },
  states: {
    UNINITIALISED: {
      on: {
        INIT: {
          actions: assign({
            renderer: (ctx, { renderer }) => renderer,
          }),
          target: "SELECT_MODE",
        },
      },
    },
    SELECT_MODE: Select,
    PAN_MODE: Pan,
  },
  schema: {
    context: {} as Context,
    events: {} as Events,
  },
});
