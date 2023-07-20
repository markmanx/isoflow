import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import { Icon as IconInterface } from 'src/stores/useSceneStore';

interface Props {
  icon: IconInterface;
  onClick: () => void;
}

export const Icon = ({ icon, onClick }: Props) => (
  <Button variant="text" onClick={onClick}>
    <Stack justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
      <Box
        component="img"
        src={icon.url}
        alt={`Icon ${icon.name}`}
        sx={{ width: '100%', height: 80 }}
      />
      <Typography variant="body2" color="text.secondary">
        {icon.name}
      </Typography>
    </Stack>
  </Button>
);
