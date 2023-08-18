import React, { useCallback } from 'react';
import { Rectangle } from 'src/types';
import { useTheme } from '@mui/material';
import { useSceneStore } from 'src/stores/sceneStore';
import { useRectangle } from 'src/hooks/useRectangle';
import { ColorSelector } from 'src/components/ColorSelector/ColorSelector';
import { ControlsContainer } from '../components/ControlsContainer';
import { Section } from '../components/Section';
import { Header } from '../components/Header';

interface Props {
  id: string;
}

export const RectangleControls = ({ id }: Props) => {
  const theme = useTheme();
  const sceneActions = useSceneStore((state) => {
    return state.actions;
  });
  const rectangle = useRectangle(id);

  const onRectangleUpdated = useCallback(
    (updates: Partial<Rectangle>) => {
      sceneActions.updateRectangle(id, updates);
    },
    [sceneActions, id]
  );

  return (
    <ControlsContainer header={<Header title="Rectangle settings" />}>
      <Section>
        <ColorSelector
          colors={Object.values(theme.customVars.diagramPalette)}
          onChange={(color) => {
            return onRectangleUpdated({ color });
          }}
          activeColor={rectangle.color}
        />
      </Section>
    </ControlsContainer>
  );
};
