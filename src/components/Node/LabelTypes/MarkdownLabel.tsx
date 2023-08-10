import React from 'react';
import { Box } from '@mui/material';
import { MarkdownEditor } from 'src/components/MarkdownEditor/MarkdownEditor';

interface Props {
  label: string;
}

export const MarkdownLabel = ({ label }: Props) => {
  return (
    <Box
      sx={{
        maxWidth: 200,
        minWidth: 100,
        maxHeight: 150
      }}
    >
      <MarkdownEditor readOnly value={label} />
    </Box>
  );
};
