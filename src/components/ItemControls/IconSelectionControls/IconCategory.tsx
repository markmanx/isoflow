import React, { useState } from 'react';
import { Grid, Divider, Stack, Typography, Button } from '@mui/material';
import {
  ExpandMore as ChevronDownIcon,
  ExpandLess as ChevronUpIcon
} from '@mui/icons-material';
import { Icon as IconI } from 'src/types';
import { Section } from 'src/components/ItemControls/components/Section';
import { Icon } from './Icon';

interface Props {
  name?: string;
  icons: IconI[];
  onClick?: (icon: IconI) => void;
  onMouseDown?: (icon: IconI) => void;
  expanded?: boolean;
}

export const IconCategory = ({
  name,
  icons,
  onClick,
  onMouseDown,
  expanded = true
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  return (
    <Section sx={{ pt: 0 }}>
      <Button
        variant="text"
        fullWidth
        onClick={() => {
          return setIsExpanded(!isExpanded);
        }}
      >
        <Stack
          sx={{ width: '100%' }}
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="body2"
            color="text.secondary"
            textTransform="uppercase"
            fontWeight={600}
          >
            {name}
          </Typography>
          {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Stack>
      </Button>
      <Divider />

      {isExpanded && (
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
      )}
    </Section>
  );
};
