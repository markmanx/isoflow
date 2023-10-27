import React from 'react';
import { ProjectionOrientationEnum } from 'src/types';
import {
  Box,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Slider
} from '@mui/material';
import { TextRotationNone as TextRotationNoneIcon } from '@mui/icons-material';
import { useTextBox } from 'src/hooks/useTextBox';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { getIsoProjectionCss } from 'src/utils';
import { useScene } from 'src/hooks/useScene';
import { ControlsContainer } from '../components/ControlsContainer';
import { Section } from '../components/Section';
import { DeleteButton } from '../components/DeleteButton';

interface Props {
  id: string;
}

export const TextBoxControls = ({ id }: Props) => {
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const textBox = useTextBox(id);
  const { updateTextBox, deleteTextBox } = useScene();

  return (
    <ControlsContainer>
      <Section>
        <TextField
          value={textBox.content}
          onChange={(e) => {
            updateTextBox(textBox.id, { content: e.target.value as string });
          }}
        />
      </Section>
      <Section title="Text size">
        <Slider
          marks
          step={0.3}
          min={0.3}
          max={0.9}
          value={textBox.fontSize}
          onChange={(e, newSize) => {
            updateTextBox(textBox.id, { fontSize: newSize as number });
          }}
        />
      </Section>
      <Section title="Alignment">
        <ToggleButtonGroup
          value={textBox.orientation}
          exclusive
          onChange={(e, orientation) => {
            if (textBox.orientation === orientation || orientation === null)
              return;

            updateTextBox(textBox.id, { orientation });
          }}
        >
          <ToggleButton value={ProjectionOrientationEnum.X}>
            <TextRotationNoneIcon sx={{ transform: getIsoProjectionCss() }} />
          </ToggleButton>
          <ToggleButton value={ProjectionOrientationEnum.Y}>
            <TextRotationNoneIcon
              sx={{
                transform: `scale(-1, 1) ${getIsoProjectionCss()} scale(-1, 1)`
              }}
            />
          </ToggleButton>
        </ToggleButtonGroup>
      </Section>
      <Section>
        <Box>
          <DeleteButton
            onClick={() => {
              uiStateActions.setItemControls(null);
              deleteTextBox(textBox.id);
            }}
          />
        </Box>
      </Section>
    </ControlsContainer>
  );
};
