import React from 'react';
import { Grid, Divider } from '@mui/material';
import { Icon as IconI } from 'src/types';
import { Icon } from './Icon';
import { Section } from '../components/Section';

interface Props {
  name?: string;
  icons: IconI[];
  onClick?: (icon: IconI) => void;
  onMouseDown?: (icon: IconI) => void;
}

export const IconCategory = ({ name, icons, onClick, onMouseDown }: Props) => {
  return (
    <Section title={name} sx={{ pt: 0 }}>
      <Divider />
      <Grid container spacing={2} sx={{ pt: 1 }}>
        {icons.map((icon) => {
          return (
            <Grid item xs={3} key={icon.id}>
              <Icon
                icon={icon}
                onClick={() => {
                  if (!onClick) return;

                  return onClick(icon);
                }}
                onMouseDown={() => {
                  if (!onMouseDown) return;

                  return onMouseDown(icon);
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </Section>
  );
};
