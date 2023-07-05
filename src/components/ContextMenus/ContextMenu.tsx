import React from "react";
import { List, Box, Card } from "@mui/material";
import { keyframes } from "@emotion/react";

interface Props {
  children: React.ReactNode;
  position: { x: number; y: number };
}

const COLOR = "grey.900";
const SIZE = 11;
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
        top: position.y,
        left: position.x + SIZE,
        animation: `${ANIMATIONS.in} 0.2s ease-in-out`,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: -(SIZE - 2),
          top: 8,
          width: 0,
          height: 0,
          borderTop: `${SIZE}px solid transparent`,
          borderBottom: `${SIZE}px solid transparent`,
          borderRight: `${SIZE}px solid`,
          borderRightColor: COLOR,
        }}
      />
      <Card sx={{ borderRadius: 2 }}>
        <List sx={{ p: 0 }}>{children}</List>
      </Card>
    </Box>
  );
};
