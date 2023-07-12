import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { useRenderer } from "./useRenderer";
import { Node } from "./Node";
import { useInterfaceManager } from "./interfaceManager/useInterfaceManager";
import { Coords } from "../../utils/Coords";
import { Select } from "./interfaceManager/Select";

export const Renderer = () => {
  const containerRef = useRef<HTMLCanvasElement>(null);
  const renderer = useRenderer();
  const interfaceManager = useInterfaceManager();

  useEffect(() => {
    if (!containerRef.current) return;

    renderer.init(containerRef.current);
    interfaceManager.activateMode(Select);
  }, [renderer.init, interfaceManager.activateMode]);

  useEffect(() => {
    if (!renderer.isReady) return;

    renderer.nodeManager.updateNode("abc", {
      position: interfaceManager.mouse.position,
    });
  }, [
    interfaceManager.mouse.position,
    renderer.nodeManager.updateNode,
    renderer.isReady,
  ]);

  useEffect(() => {
    if (!renderer.isReady) return;

    renderer.nodeManager.removeNode("abc");

    renderer.nodeManager.createNode({
      id: "abc",
      position: new Coords(0, 0),
      iconId: "block",
    });
  }, [renderer.isReady]);

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
