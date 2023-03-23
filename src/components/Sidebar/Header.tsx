import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Section } from "./Section";

interface Props {
  title: string;
  onClose: () => void;
}

export const Header = ({ title, onClose }: Props) => {
  return (
    <Section>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Box>
            <Button variant="text" onClick={onClose}>
              <CloseIcon />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
};
