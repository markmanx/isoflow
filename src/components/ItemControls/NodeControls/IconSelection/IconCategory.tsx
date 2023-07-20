import React from 'react';
import Grid from '@mui/material/Grid';
import { Icon as IconInterface } from 'src/stores/useSceneStore';
import { Icon } from './Icon';
import { Section } from '../../components/Section';

interface Props {
  name?: string;
  icons: IconInterface[];
  onClick: (icon: IconInterface) => void;
}

export const IconCategory = ({ name, icons, onClick }: Props) => (
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
