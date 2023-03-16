import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Icon as IconI } from "../../../types";

interface Props {
  icon: IconI;
}

export const Icon = ({ icon }: Props) => {
  return (
    <Stack justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
      <Box
        component="img"
        src={icon.url}
        alt={`Icon ${icon.name}`}
        sx={{ width: "100%", height: 80 }}
      />
      <Typography variant="body2" color="text.secondary">
        {icon.name}
      </Typography>
    </Stack>
  );
};
