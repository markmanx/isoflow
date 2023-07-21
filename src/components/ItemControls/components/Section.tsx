import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

interface Props {
  children: React.ReactNode;
  title?: string;
  py?: number;
  px?: number;
}

export const Section = ({ children, py, px, title }: Props) => (
  <Box py={py ?? 3} px={px ?? 3}>
    <Stack>
      {title && (
        <Typography variant="body2" color="text.secondary" pb={0.5}>
          {title}
        </Typography>
      )}
      {children}
    </Stack>
  </Box>
);
