import React, { useCallback } from 'react';
import { TextBox, ProjectionOrientationEnum } from 'src/types';
import {
  Box,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Slider
} from '@mui/material';
import { TextRotationNone as TextRotationNoneIcon } from '@mui/icons-material';
import { useSceneStore } from 'src/stores/sceneStore';
import { useTextBox } from 'src/hooks/useTextBox';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { getIsoProjectionCss } from 'src/utils';
import { ControlsContainer } from '../components/ControlsContainer';
import { Section } from '../components/Section';
import { Header } from '../components/Header';
import { DeleteButton } from '../components/DeleteButton';

interface Props {
  id: string;
}

export const TextBoxControls = ({ id }: Props) => {
  const sceneActions = useSceneStore((state) => {
    return state.actions;
  });
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const textBox = useTextBox(id);

  const onTextBoxUpdated = useCallback(
    (updates: Partial<TextBox>) => {
      sceneActions.updateTextBox(id, updates);
    },
    [sceneActions, id]
  );

  const onTextBoxDeleted = useCallback(() => {
    uiStateActions.setItemControls(null);
    sceneActions.deleteTextBox(id);
  }, [sceneActions, id, uiStateActions]);

  return (
    <ControlsContainer header={<Header title="Text settings" />}>
      <Section>
        <TextField
          value={textBox.text}
          onChange={(e) => {
            onTextBoxUpdated({ text: e.target.value as string });
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
            onTextBoxUpdated({ fontSize: newSize as number });
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

            onTextBoxUpdated({ orientation });
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
          <DeleteButton onClick={onTextBoxDeleted} />
        </Box>
      </Section>
    </ControlsContainer>
  );
};
