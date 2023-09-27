import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import { Icon as IconI } from 'src/types';

interface Props {
  icon: IconI;
  onClick?: () => void;
  onMouseDown?: () => void;
}

export const Icon = ({ icon, onClick, onMouseDown }: Props) => {
  return (
    <Button
      variant="text"
      onClick={onClick}
      onMouseDown={onMouseDown}
      sx={{ userSelect: 'none', height: 100 }}
    >
      <Stack sx={{ height: '100%' }} spacing={1}>
        <Box
          sx={{
            height: 50,
            width: '100%',
            display: 'flex',
            alignItems: 'flex-end'
          }}
        >
          <Box
            component="img"
            draggable={false}
            src={icon.url}
            alt={`Icon ${icon.name}`}
            sx={{ width: '100%', maxHeight: '100%' }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {icon.name}
        </Typography>
      </Stack>
    </Button>
  );
};
