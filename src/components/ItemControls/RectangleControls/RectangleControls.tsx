import React from 'react';
import { useTheme, Box } from '@mui/material';
import { useRectangle } from 'src/hooks/useRectangle';
import { ColorSelector } from 'src/components/ColorSelector/ColorSelector';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useScene } from 'src/hooks/useScene';
import { ControlsContainer } from '../components/ControlsContainer';
import { Section } from '../components/Section';
import { DeleteButton } from '../components/DeleteButton';

interface Props {
  id: string;
}

export const RectangleControls = ({ id }: Props) => {
  const theme = useTheme();
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const rectangle = useRectangle(id);
  const { updateRectangle, deleteRectangle } = useScene();

  return (
    <ControlsContainer>
      <Section>
        <ColorSelector
          colors={Object.values(theme.customVars.customPalette)}
          onChange={(color) => {
            updateRectangle(rectangle.id, { color });
          }}
          activeColor={rectangle.color}
        />
      </Section>
      <Section>
        <Box>
          <DeleteButton
            onClick={() => {
              uiStateActions.setItemControls(null);
              deleteRectangle(rectangle.id);
            }}
          />
        </Box>
      </Section>
    </ControlsContainer>
  );
};
