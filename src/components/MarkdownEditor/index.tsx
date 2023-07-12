import React from "react";
import ReactQuill from "react-quill";
import { Box } from "@mui/material";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const style = {
  ".ql-toolbar.ql-snow": {
    border: "none",
    pt: 0,
    px: 0,
  },
  ".ql-toolbar.ql-snow + .ql-container.ql-snow": {
    border: "1px solid",
    borderColor: "grey.800",
    borderTop: "auto",
    borderRadius: 1.5,
    height: 200,
  },
};

const tools = ["bold", "italic", "underline", "strike", "bullet", "link"];

export const MarkdownEditor = ({ value, onChange }: Props) => {
  return (
    <Box sx={style}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        formats={tools}
        modules={{
          toolbar: tools,
        }}
      />
    </Box>
  );
};
