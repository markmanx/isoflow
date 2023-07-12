import { useState, useCallback, useEffect } from "react";
import { Tool } from "paper";
import { Coords } from "../../../utils/Coords";

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

export const useInterfaceManager = () => {
  const [currentMode, setCurrentMode] = useState(null);
  const [mouse, setMouse] = useState<Mouse>({
    position: new Coords(0, 0),
    delta: new Coords(0, 0),
  });

  const activateMode = useCallback(() => {}, []);

  const sendEvent = useCallback((type: string, payload: any) => {}, []);

  const onMouseEvent = useCallback(
    (event: paper.ToolEvent) => {
      const type = MOUSE_EVENTS.get(event.type);

      if (!type) return;

      const mouse = {
        position: new Coords(event.point.x, event.point.y),
        delta: event.delta ? new Coords(event.delta.x, event.delta.y) : null,
      };

      setMouse(mouse);
      sendEvent(type, mouse);
    },
    [sendEvent]
  );

  useEffect(() => {
    const tool = new Tool();
    tool.onMouseMove = onMouseEvent;
    tool.onMouseDown = onMouseEvent;
    tool.onMouseUp = onMouseEvent;
    tool.onKeyDown = onMouseEvent;
    tool.onKeyUp = onMouseEvent;
  }, [onMouseEvent]);

  return {
    activateMode,
    mouse,
  };
};
