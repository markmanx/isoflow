import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import { Box } from '@mui/material';

interface Props {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

const tools = ['bold', 'italic', 'underline', 'strike', 'bullet', 'link'];

export const MarkdownEditor = ({ value, onChange, readOnly }: Props) => {
  const modules = useMemo(() => {
    if (!readOnly)
      return {
        toolbar: tools
      };

    return { toolbar: false };
  }, [readOnly]);

  return (
    <Box
      sx={{
        '.ql-toolbar.ql-snow': {
          border: 'none',
          pt: 0,
          px: 0
        },
        '.ql-toolbar.ql-snow + .ql-container.ql-snow': {
          border: '1px solid',
          borderColor: 'grey.800',
          borderTop: 'auto',
          borderRadius: 1.5,
          height: 200
        },
        '.ql-container.ql-snow': {
          ...(readOnly ? { border: 'none' } : {})
        },
        '.ql-editor': {
          ...(readOnly ? { p: 0 } : {})
        }
      }}
    >
      <ReactQuill
        theme="snow"
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        formats={tools}
        modules={modules}
      />
    </Box>
  );
};
