import React from 'react';
import { Box } from '@mui/material';
import { ColorSwatch } from './ColorSwatch';

interface Props {
  colors: string[];
  onChange: (color: string) => void;
  activeColor: string;
}

export const ColorSelector = ({ colors, onChange, activeColor }: Props) => {
  return (
    <Box>
      {colors.map((color) => {
        return (
          <ColorSwatch
            key={color}
            hex={color}
            onClick={() => {
              return onChange(color);
            }}
            isActive={activeColor === color}
          />
        );
      })}
    </Box>
  );
};
