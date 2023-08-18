import React from 'react';
import { Slider, Box } from '@mui/material';
import { Node } from 'src/types';
import { MarkdownEditor } from 'src/components/MarkdownEditor/MarkdownEditor';
import { DeleteButton } from '../../components/DeleteButton';
import { Section } from '../../components/Section';

interface Props {
  label: string;
  labelHeight: number;
  onUpdate: (updates: Partial<Node>) => void;
  onDelete: () => void;
}

export const NodeSettings = ({
  label,
  labelHeight,
  onUpdate,
  onDelete
}: Props) => {
  return (
    <>
      <Section title="Label">
        <MarkdownEditor
          value={label}
          onChange={(text) => {
            if (label !== text) onUpdate({ label: text });
          }}
        />
      </Section>
      <Section title="Label height">
        <Slider
          marks
          step={20}
          min={60}
          max={280}
          value={labelHeight}
          onChange={(e, newHeight) => {
            onUpdate({ labelHeight: newHeight as number });
          }}
        />
      </Section>
      <Section>
        <Box>
          <DeleteButton onClick={onDelete} />
        </Box>
      </Section>
    </>
  );
};
