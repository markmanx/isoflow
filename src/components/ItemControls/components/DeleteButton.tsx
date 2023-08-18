import React from 'react';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Button } from '@mui/material';

interface Props {
  onClick: () => void;
}

export const DeleteButton = ({ onClick }: Props) => {
  return (
    <Button
      color="error"
      size="small"
      variant="outlined"
      startIcon={<DeleteIcon />}
      onClick={onClick}
    >
      Delete
    </Button>
  );
};
