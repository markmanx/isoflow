import React from 'react';
import { Box } from '@mui/material';
import { ColorSwatch } from './ColorSwatch';

interface Props {
  colors: string[];
  onChange: (color: string) => void;
  activeColor: string;
}

export const ColorSelector = ({ colors, onChange, activeColor }: Props) => (
  <Box>
    {colors.map((color) => (
      <ColorSwatch
        key={color}
        hex={color}
        onClick={() => onChange(color)}
        isActive={activeColor === color}
      />
    ))}
  </Box>
);
