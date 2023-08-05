import React from 'react';
import Grid from '@mui/material/Grid';
import { Icon as IconI } from 'src/types';
import { Icon } from './Icon';
import { Section } from '../../components/Section';

interface Props {
  name?: string;
  icons: IconI[];
  onClick: (icon: IconI) => void;
}

export const IconCategory = ({ name, icons, onClick }: Props) => {
  return (
    <Section title={name}>
      <Grid container spacing={2}>
        {icons.map((icon) => {
          return (
            <Grid item xs={3} key={icon.id}>
              <Icon
                icon={icon}
                onClick={() => {
                  return onClick(icon);
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </Section>
  );
};
