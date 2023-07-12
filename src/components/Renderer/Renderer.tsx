import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { useRenderer } from "./useRenderer";

export const Renderer = () => {
  const containerRef = useRef<HTMLCanvasElement>(null);
  const renderer = useRenderer();

  useEffect(() => {
    if (!containerRef.current) return;
    renderer.init(containerRef.current);
  }, [renderer.init]);

  return (
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
  );
};
