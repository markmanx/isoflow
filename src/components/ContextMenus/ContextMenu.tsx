import React from "react";
import { List, Box, Card } from "@mui/material";
import { keyframes } from "@emotion/react";

interface Props {
  children: React.ReactNode;
  position: { x: number; y: number };
}

const COLOR = "grey.900";
const ARROW = {
  size: 11,
  top: 8,
};
const ANIMATIONS = {
  in: keyframes`
  0% {
    opacity: 0;
    transform: translateX(15px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
  `,
};

export const ContextMenu = ({ position, children }: Props) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: position.y - 20,
        left: position.x + ARROW.size * 2,
        animation: `${ANIMATIONS.in} 0.2s ease-in-out`,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: -(ARROW.size - 2),
          top: ARROW.top,
          width: 0,
          height: 0,
          borderTop: `${ARROW.size}px solid transparent`,
          borderBottom: `${ARROW.size}px solid transparent`,
          borderRight: `${ARROW.size}px solid`,
          borderRightColor: COLOR,
        }}
      />
      <Card sx={{ borderRadius: 2 }}>
        <List sx={{ p: 0 }}>{children}</List>
      </Card>
    </Box>
  );
};
