import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { useRenderer } from "./useRenderer";
import { Node } from "./Node";
import { useInterfaceManager } from "./interfaceManager/useInterfaceManager";
import { Coords } from "../../utils/Coords";

export const Renderer = () => {
  const containerRef = useRef<HTMLCanvasElement>(null);
  const renderer = useRenderer();
  const interfaceManager = useInterfaceManager();

  useEffect(() => {
    if (!containerRef.current) return;
    renderer.init(containerRef.current);
  }, [renderer.init]);

  useEffect(() => {
    renderer.nodeManager.updateNode("abc", {
      position: interfaceManager.mouse.position,
    });
  }, [interfaceManager.mouse.position, renderer.nodeManager.updateNode]);

  useEffect(() => {
    renderer.nodeManager.removeNode("abc");

    renderer.nodeManager.createNode({
      id: "abc",
      position: new Coords(0, 0),
      iconId: "block",
    });
  }, []);

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
      ></Box>
      {renderer.nodeManager.nodes.map((node) => (
        <Node
          key={node.id}
          {...node}
          parentContainer={renderer.nodeManager.container}
        />
      ))}
    </Box>
  );
};
