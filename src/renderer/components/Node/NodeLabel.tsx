import React from 'react';
import { Box } from '@mui/material';
import { MarkdownEditor } from 'src/components/MarkdownEditor/MarkdownEditor';

interface Props {
  label: string;
}

export const NodeLabel = ({ label }: Props) => (
  <Box
    sx={{
      bgcolor: 'common.white',
      border: '1px solid',
      borderColor: 'grey.500',
      maxWidth: 200,
      maxHeight: 150,
      borderRadius: 2,
      overflow: 'hidden',
      py: 1,
      px: 1.5
    }}
  >
    <MarkdownEditor readOnly value={label} />
  </Box>
);
