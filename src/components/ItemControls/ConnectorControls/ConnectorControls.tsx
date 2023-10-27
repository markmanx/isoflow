import React from 'react';
import { Connector, connectorStyleOptions } from 'src/types';
import {
  useTheme,
  Box,
  Slider,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import { useConnector } from 'src/hooks/useConnector';
import { ColorSelector } from 'src/components/ColorSelector/ColorSelector';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useScene } from 'src/hooks/useScene';
import { ControlsContainer } from '../components/ControlsContainer';
import { Section } from '../components/Section';
import { DeleteButton } from '../components/DeleteButton';

interface Props {
  id: string;
}

export const ConnectorControls = ({ id }: Props) => {
  const theme = useTheme();
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const connector = useConnector(id);
  const { updateConnector, deleteConnector } = useScene();

  return (
    <ControlsContainer>
      <Section>
        <TextField
          label="Label"
          value={connector.description}
          onChange={(e) => {
            updateConnector(connector.id, {
              description: e.target.value as string
            });
          }}
        />
      </Section>
      <Section>
        <ColorSelector
          colors={Object.values(theme.customVars.customPalette)}
          onChange={(color) => {
            return updateConnector(connector.id, { color });
          }}
          activeColor={connector.color}
        />
      </Section>
      <Section title="Width">
        <Slider
          marks
          step={10}
          min={10}
          max={30}
          value={connector.width}
          onChange={(e, newWidth) => {
            updateConnector(connector.id, { width: newWidth as number });
          }}
        />
      </Section>
      <Section title="Style">
        <Select
          value={connector.style}
          onChange={(e) => {
            updateConnector(connector.id, {
              style: e.target.value as Connector['style']
            });
          }}
        >
          {Object.values(connectorStyleOptions).map((style) => {
            return <MenuItem value={style}>{style}</MenuItem>;
          })}
        </Select>
      </Section>
      <Section>
        <Box>
          <DeleteButton
            onClick={() => {
              uiStateActions.setItemControls(null);
              deleteConnector(connector.id);
            }}
          />
        </Box>
      </Section>
    </ControlsContainer>
  );
};
