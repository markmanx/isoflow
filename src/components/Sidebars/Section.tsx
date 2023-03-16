import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface Props {
  children: React.ReactNode;
  title?: string;
}

export const Section = ({ children, title }: Props) => {
  return (
    <Box pt={4} px={4}>
      <Stack>
        {title && <Typography fontWeight={600}>{title}</Typography>}
        {children}
      </Stack>
    </Box>
  );
};
