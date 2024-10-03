import React from 'react';
import { Slider, TextField, Grid } from '@mui/material';
import { ModelItem, ViewItem } from 'src/types';
import { MarkdownEditor } from 'src/components/MarkdownEditor/MarkdownEditor';
import { useModelItem } from 'src/hooks/useModelItem';
import { DeleteButton } from '../../components/DeleteButton';
import { DuplicateButton } from '../../components/DuplicateButton';
import { Section } from '../../components/Section';

export type NodeUpdates = {
  model: Partial<ModelItem>;
  view: Partial<ViewItem>;
};

interface Props {
  node: ViewItem;
  onModelItemUpdated: (updates: Partial<ModelItem>) => void;
  onViewItemUpdated: (updates: Partial<ViewItem>) => void;
  onDeleted: () => void;
  onDuplicated: () => void;
}

export const NodeSettings = ({
  node,
  onModelItemUpdated,
  onViewItemUpdated,
  onDeleted,
  onDuplicated
}: Props) => {
  const modelItem = useModelItem(node.id);

  return (
    <>
      <Section title="Name">
        <TextField
          value={modelItem.name}
          onChange={(e) => {
            const text = e.target.value as string;
            if (modelItem.name !== text) onModelItemUpdated({ name: text });
          }}
        />
      </Section>
      <Section title="Description">
        <MarkdownEditor
          value={modelItem.description}
          onChange={(text) => {
            if (modelItem.description !== text)
              onModelItemUpdated({ description: text });
          }}
        />
      </Section>
      {modelItem.name && (
        <Section title="Label height">
          <Slider
            marks
            step={20}
            min={60}
            max={280}
            value={node.labelHeight}
            onChange={(e, newHeight) => {
              const labelHeight = newHeight as number;
              onViewItemUpdated({ labelHeight });
            }}
          />
        </Section>
      )}
      <Grid container spacing={2} sx={{ pt: 3, px: 3 }}>
        <Grid item>
          <DeleteButton onClick={onDeleted} />
        </Grid>
        <Grid item>
          <DuplicateButton onClick={onDuplicated} />
        </Grid>
      </Grid>
    </>
  );
};
