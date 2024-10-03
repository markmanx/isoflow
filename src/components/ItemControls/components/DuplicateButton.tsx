import React from 'react';
import { DeleteOutlined as DeleteIcon } from '@mui/icons-material';
import { ContentCopy as DuplicateIcon } from '@mui/icons-material';
import { Button } from '@mui/material';

interface Props {
  onClick: () => void;
}

export const DuplicateButton = ({ onClick }: Props) => {
  return (
    <Button
      size="small"
      variant="outlined"
      startIcon={<DuplicateIcon color="primary" />}
      onClick={onClick}
    >
      Duplicate
    </Button>
  );
};
