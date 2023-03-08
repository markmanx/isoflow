import { useRef, useEffect, useContext } from "react";
import { Renderer } from "../renderer/Renderer";
import { useGlobalState } from "../hooks/useGlobalState";
import { GlobalStateContext } from "../contexts/GlobalStateContext";
import { useMouseInput } from "../hooks/useMouseInput";

export const RendererContainer = () => {
  const { editor } = useContext(GlobalStateContext);
  const rendererEl = useRef<HTMLDivElement>(null);
  const { setDomEl, setCallbacks } = useMouseInput();
  const setRenderer = useGlobalState((state) => state.setRenderer);

  useEffect(() => {
    if (!rendererEl.current) return;

    const renderer = new Renderer(rendererEl.current);
    setRenderer(renderer);
    setDomEl(rendererEl.current);
    editor.send("INIT", {
      renderer,
    });
  }, [setRenderer, setDomEl, editor]);

  useEffect(() => {
    if (!rendererEl.current) return;

    setCallbacks({
      onMouseMove: (event) => {
        editor.send("MOUSE_MOVE", { ...event });
      },
      onMouseDown: (event) => {
        editor.send("MOUSE_DOWN", { ...event });
      },
      onMouseUp: (event) => {
        editor.send("MOUSE_UP", { ...event });
      },
      onMouseEnter: (event) => {
        editor.send("MOUSE_ENTER", { ...event });
      },
      onMouseLeave: (event) => {
        editor.send("MOUSE_LEAVE", { ...event });
      },
    });
  }, [setCallbacks, editor]);

  return (
    <div
      ref={rendererEl}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    />
  );
};
