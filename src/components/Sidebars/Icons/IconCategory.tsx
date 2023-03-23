import React from "react";
import Grid from "@mui/material/Grid";
import { Icon as IconI } from "../../../types";
import { Icon } from "./Icon";
import { Section } from "../../Sidebar/Section";

interface Props {
  name?: string;
  icons: IconI[];
}

export const IconCategory = ({ name, icons }: Props) => {
  return (
    <Section title={name}>
      <Grid container spacing={2}>
        {icons.map((icon) => (
          <Grid item xs={3} key={icon.id}>
            <Icon icon={icon} />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};
