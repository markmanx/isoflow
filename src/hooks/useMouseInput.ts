import { useEffect, useState } from "react";

interface MouseCoords {
  x: number;
  y: number;
}

interface MousePosition {
  position: MouseCoords;
  delta: MouseCoords | null;
}

type _MouseEvent = (e: MousePosition) => void;

interface MouseEvents {
  onMouseMove: _MouseEvent;
  onMouseDown: _MouseEvent;
  onMouseUp: _MouseEvent;
  onMouseEnter: _MouseEvent;
  onMouseLeave: _MouseEvent;
}

const mouseEventToCoords = (e: MouseEvent) => {
  return {
    x: e.clientX,
    y: e.clientY,
  };
};

const parseMousePosition = (e: MouseEvent, mousedown: MouseCoords | null) => {
  const current = mouseEventToCoords(e);
  const delta = mousedown
    ? { x: current.x - mousedown.x, y: current.y - mousedown.y }
    : null;

  return {
    position: { x: current.x, y: current.y },
    delta,
  };
};

export const useMouseInput = () => {
  const [domEl, setDomEl] = useState<HTMLDivElement>();
  const [callbacks, setCallbacks] = useState<MouseEvents>();

  useEffect(() => {
    if (!callbacks || !domEl) return;

    let lastPosition: MouseCoords | null = null;

    const onMouseDown = (e: MouseEvent) => {
      callbacks.onMouseDown(parseMousePosition(e, lastPosition));
      lastPosition = mouseEventToCoords(e);
    };

    const onMouseUp = (e: MouseEvent) => {
      callbacks.onMouseUp(parseMousePosition(e, lastPosition));
      lastPosition = mouseEventToCoords(e);
    };

    const onMouseMove = (e: MouseEvent) => {
      callbacks.onMouseMove(parseMousePosition(e, lastPosition));
      lastPosition = mouseEventToCoords(e);
    };

    const onMouseEnter = (e: MouseEvent) => {
      callbacks.onMouseEnter(parseMousePosition(e, lastPosition));
      lastPosition = mouseEventToCoords(e);
    };

    const onMouseLeave = (e: MouseEvent) => {
      callbacks.onMouseLeave(parseMousePosition(e, lastPosition));
      lastPosition = mouseEventToCoords(e);
    };

    domEl.addEventListener("mousemove", onMouseMove);
    domEl.addEventListener("mousedown", onMouseDown);
    domEl.addEventListener("mouseup", onMouseUp);
    domEl.addEventListener("mouseenter", onMouseEnter);
    domEl.addEventListener("mouseleave", onMouseLeave);

    return () => {
      domEl.removeEventListener("mousemove", onMouseMove);
      domEl.removeEventListener("mousedown", onMouseDown);
      domEl.removeEventListener("mouseup", onMouseUp);
      domEl.removeEventListener("mouseenter", onMouseEnter);
      domEl.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [callbacks, domEl]);

  return { setCallbacks, setDomEl };
};
