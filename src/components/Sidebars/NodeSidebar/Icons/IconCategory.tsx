import React from "react";
import Grid from "@mui/material/Grid";
import { IconI } from "../../../../validation/SceneSchema";
import { Icon } from "./Icon";
import { Section } from "../../../Sidebar/Section";

interface Props {
  name?: string;
  icons: IconI[];
  onClick: (icon: IconI) => void;
}

export const IconCategory = ({ name, icons, onClick }: Props) => {
  return (
    <Section title={name}>
      <Grid container spacing={2}>
        {icons.map((icon) => (
          <Grid item xs={3} key={icon.id}>
            <Icon icon={icon} onClick={() => onClick(icon)} />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};
