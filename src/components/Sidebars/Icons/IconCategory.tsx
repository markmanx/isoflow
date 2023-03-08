import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Icon as IconI } from "../../../types";
import { Icon } from "./Icon";
import { Section } from "../Section";

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
