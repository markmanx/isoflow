import React, { useRef, useEffect, useContext } from "react";
import { observer } from "mobx-react";
import { useGlobalState } from "../hooks/useGlobalState";
import { modeManagerContext } from "../contexts/ModeManagerContext";
import { Select } from "../modes/Select";

export const RendererContainer = observer(() => {
  const modeManager = useContext(modeManagerContext);
  const rendererEl = useRef<HTMLDivElement>(null);
  const setRenderer = useGlobalState((state) => state.setRenderer);
  const onSceneChange = useGlobalState((state) => state.onSceneChange);

  useEffect(() => {
    if (!rendererEl.current) return;

    const renderer = setRenderer(rendererEl.current);
    modeManager.setRenderer(renderer);
    modeManager.setEventEmitter(renderer.callbacks.emitEvent);
    modeManager.activateMode(Select);
  }, [setRenderer, modeManager, onSceneChange]);

  return (
    <div
      ref={rendererEl}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
});
