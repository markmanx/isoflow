import React from "react";
import Box from "@mui/material/Box";

interface Props {
  header: React.ReactNode;
  children: React.ReactNode;
}

export const Sidebar = ({ header, children }: Props) => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ width: "100%" }}>{header}</Box>
      <Box
        sx={{
          width: "100%",
          overflowY: "scroll",
          flexGrow: 1,
        }}
      >
        <Box sx={{ width: "100%" }}>{children}</Box>
      </Box>
    </Box>
  );
};
