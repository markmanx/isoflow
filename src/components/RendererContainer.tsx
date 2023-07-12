import React, { useRef, useEffect, useContext, useMemo } from "react";
import { observer } from "mobx-react";
import { Box } from "@mui/material";
import { useGlobalState } from "../hooks/useGlobalState";
import { modeManagerContext } from "../contexts/ModeManagerContext";
import { Select } from "../modes/Select";
import { Renderer } from "../renderer/Renderer";
import { Coords } from "../renderer/elements/Coords";
import {
  PROJECTED_TILE_WIDTH,
  PROJECTED_TILE_HEIGHT,
} from "../renderer/constants";

const UI_OVERLAY_MARGIN = 300;

export const RendererContainer = observer(() => {
  const modeManager = useContext(modeManagerContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const onSceneChange = useGlobalState((state) => state.onSceneChange);
  const initialScene = useGlobalState((state) => state.initialScene);
  const onRendererEvent = useGlobalState((state) => state.onRendererEvent);
  const setRenderer = useGlobalState((state) => state.setRenderer);
  const renderer = useGlobalState((state) => state.renderer);

  useEffect(() => {
    if (!containerRef.current) return;

    if (renderer) renderer.destroy();

    const _renderer = new Renderer(containerRef.current);
    _renderer.setEventHandler(onRendererEvent);
    modeManager.setRenderer(_renderer);
    _renderer.loadScene(initialScene);
    modeManager.setEventEmitter(_renderer.callbacks.emitEvent);
    modeManager.activateMode(Select);
    setRenderer(_renderer);

    return () => {
      _renderer.destroy();
    };
  }, [modeManager, onSceneChange, onRendererEvent, initialScene]);

  const uiOverlayPosition = useMemo(() => {
    return {
      size: new Coords(
        renderer.sceneElements.grid.size.x * PROJECTED_TILE_WIDTH +
          UI_OVERLAY_MARGIN * 2,
        renderer.sceneElements.grid.size.y * PROJECTED_TILE_HEIGHT +
          UI_OVERLAY_MARGIN * 2
      ),
    };
  }, [
    { ...renderer.scroll.position },
    renderer.zoom,
    { ...renderer.sceneElements.grid.size },
  ]);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "1px",
          height: "1px",
        }}
      />
    </Box>
  );
});
