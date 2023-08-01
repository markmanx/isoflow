import React from 'react';
import { Slider, useTheme } from '@mui/material';
import { Node } from 'src/types';
import { ColorSelector } from 'src/components/ColorSelector/ColorSelector';
import { MarkdownEditor } from '../../../MarkdownEditor/MarkdownEditor';

import { Section } from '../../components/Section';

interface Props {
  label: string;
  labelHeight: number;
  onUpdate: (updates: Partial<Node>) => void;
  color: string;
}

export const NodeSettings = ({
  color,
  label,
  labelHeight,
  onUpdate
}: Props) => {
  const theme = useTheme();

  return (
    <>
      <Section title="Label">
        <MarkdownEditor
          value={label}
          onChange={(text) => {
            return onUpdate({ label: text });
          }}
        />
      </Section>
      <Section title="Label height">
        <Slider
          marks
          step={20}
          min={0}
          max={200}
          value={labelHeight}
          onChange={(e, newHeight) => {
            return onUpdate({ labelHeight: newHeight as number });
          }}
        />
      </Section>
      <Section title="Color">
        <ColorSelector
          activeColor={color}
          colors={Object.values(theme.customVars.diagramPalette)}
          onChange={(col) => {
            return onUpdate({ color: col });
          }}
        />
      </Section>
    </>
  );
};
