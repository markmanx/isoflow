import React from 'react';
import { Slider } from '@mui/material';
import { Node } from 'src/stores/useSceneStore';
import { MarkdownEditor } from '../../../MarkdownEditor/MarkdownEditor';
import { Section } from '../../components/Section';

interface Props {
  label: string;
  labelHeight: number;
  onUpdate: (updates: Partial<Node>) => void;
}

export const NodeSettings = ({ label, labelHeight, onUpdate }: Props) => (
  <>
    <Section title="Label">
      <MarkdownEditor
        value={label}
        onChange={(text) => onUpdate({ label: text })}
      />
    </Section>
    <Section title="Label height">
      <Slider
        marks
        step={20}
        min={0}
        max={200}
        value={labelHeight}
        onChange={(e, newHeight) =>
          onUpdate({ labelHeight: newHeight as number })
        }
      />
    </Section>
  </>
);
