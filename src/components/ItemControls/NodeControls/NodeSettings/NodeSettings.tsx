import React from 'react';
import { Slider } from '@mui/material';
import { Node } from 'src/types';
import { MarkdownEditor } from '../../../MarkdownEditor/MarkdownEditor';

import { Section } from '../../components/Section';

interface Props {
  label: string;
  labelHeight: number;
  onUpdate: (updates: Partial<Node>) => void;
}

export const NodeSettings = ({ label, labelHeight, onUpdate }: Props) => {
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
    </>
  );
};
