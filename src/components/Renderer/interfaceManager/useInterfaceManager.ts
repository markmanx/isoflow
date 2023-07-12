import { useState, useCallback, useEffect, useRef } from "react";
import { Tool } from "paper";
import { Coords } from "../../../utils/Coords";

enum MOUSE_EV {
  "MOUSE_MOVE" = "MOUSE_MOVE",
}

const MOUSE_EVENTS = new Map([
  ["mousemove", "MOUSE_MOVE"],
  ["mousedown", "MOUSE_DOWN"],
  ["mouseup", "MOUSE_UP"],
  ["mouseenter", "MOUSE_ENTER"],
  ["mouseleave", "MOUSE_LEAVE"],
]);

interface Mouse {
  position: Coords;
  delta: Coords | null;
}

export type Mode = {
  entry: (mouse: Mouse) => void;
  exit: () => void;
  name: string;
} & Partial<{
  [key in keyof typeof MOUSE_EV]: (mouse: Mouse) => void;
}>;

export const useInterfaceManager = () => {
  const tool = useRef<paper.Tool>();
  const [currentMode, setCurrentMode] = useState<Mode>();
  const [mouse, setMouse] = useState<Mouse>({
    position: new Coords(0, 0),
    delta: new Coords(0, 0),
  });

  const activateMode = useCallback(
    (mode: () => Mode, initCallback?: (mode: Mode) => void) => {
      if (currentMode?.name === mode().name) return;

      setCurrentMode((prevMode) => {
        if (prevMode) {
          prevMode.exit();
        }

        const initializedMode = mode();

        initCallback?.(initializedMode);

        return initializedMode;
      });
    },
    [currentMode]
  );

  const sendEvent = useCallback(
    (type: MOUSE_EV) => {
      if (!currentMode) return;

      currentMode[type]?.({ position: new Coords(0, 0), delta: null });
    },
    [currentMode]
  );

  const onMouseEvent = useCallback(
    (event: paper.ToolEvent) => {
      const type = MOUSE_EVENTS.get(event.type);

      if (!type) return;

      const _mouse = {
        position: new Coords(event.point.x, event.point.y),
        delta: event.delta ? new Coords(event.delta.x, event.delta.y) : null,
      };

      setMouse(_mouse);
      sendEvent(type as MOUSE_EV);
    },
    [sendEvent]
  );

  useEffect(() => {
    tool.current = new Tool();
    tool.current.onMouseMove = onMouseEvent;
    tool.current.onMouseDown = onMouseEvent;
    tool.current.onMouseUp = onMouseEvent;
    tool.current.onKeyDown = onMouseEvent;
    tool.current.onKeyUp = onMouseEvent;

    return () => {
      tool.current?.remove();
    };
  }, [onMouseEvent]);

  return {
    activateMode,
    currentMode,
    setCurrentMode,
    mouse,
  };
};
