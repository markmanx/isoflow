import React, { useState } from 'react';
import { Divider, Stack, Typography, Button } from '@mui/material';
import {
  ExpandMore as ChevronDownIcon,
  ExpandLess as ChevronUpIcon
} from '@mui/icons-material';
import { Icon as IconI } from 'src/types';
import { Section } from 'src/components/ItemControls/components/Section';
import { IconGrid } from './IconGrid';

interface Props {
  id?: string;
  icons: IconI[];
  onClick?: (icon: IconI) => void;
  onMouseDown?: (icon: IconI) => void;
  isExpanded: boolean;
}

export const IconCollection = ({
  id,
  icons,
  onClick,
  onMouseDown,
  isExpanded: _isExpanded
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(_isExpanded);

  return (
    <Section sx={{ py: 0 }}>
      <Button
        variant="text"
        fullWidth
        onClick={() => {
          return setIsExpanded(!isExpanded);
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textTransform: 'uppercase',
              fontWeight: 600
            }}
          >
            {id}
          </Typography>
          {isExpanded ? (
            <ChevronUpIcon color="action" />
          ) : (
            <ChevronDownIcon color="action" />
          )}
        </Stack>
      </Button>
      <Divider />

      {isExpanded && (
        <IconGrid icons={icons} onMouseDown={onMouseDown} onClick={onClick} />
      )}
    </Section>
  );
};
