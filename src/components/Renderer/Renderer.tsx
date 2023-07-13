import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { useRenderer } from "./useRenderer";
import { Node } from "./Node";
import { useInterfaceManager } from "./interfaceManager/useInterfaceManager";
import { Select } from "./interfaceManager/Select";
import { useAppState } from "./useAppState";
import { Coords } from "../../utils/Coords";

export const Renderer = () => {
  const containerRef = useRef<HTMLCanvasElement>(null);
  const renderer = useRenderer();
  const interfaceManager = useInterfaceManager();
  const initialScene = useAppState((state) => state.initialScene);
  const setZoom = useAppState((state) => state.setZoom);
  const setScroll = useAppState((state) => state.setScroll);

  useEffect(() => {
    if (!containerRef.current) return;

    renderer.init(containerRef.current);
    interfaceManager.activateMode(Select);

    return () => {
      renderer.destroy();
      interfaceManager.destroy();
    };
  }, [
    renderer.init,
    interfaceManager.activateMode,
    renderer.destroy,
    interfaceManager.destroy,
  ]);

  useEffect(() => {
    if (!renderer.isReady) return;

    renderer.loadScene(initialScene);
    setScroll({ position: new Coords(0, 0) });
  }, [renderer.isReady, renderer.loadScene, setZoom, initialScene]);

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
        component="canvas"
        ref={containerRef}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      {renderer.nodeManager.nodes.map((node) => (
        <Node
          key={node.id}
          {...node}
          parentContainer={renderer.nodeManager.container as paper.Group}
        />
      ))}
    </Box>
  );
};
