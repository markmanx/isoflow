import React, { useCallback } from 'react';
import { Connector } from 'src/types';
import { useTheme, Box } from '@mui/material';
import { useSceneStore } from 'src/stores/sceneStore';
import { useConnector } from 'src/hooks/useConnector';
import { ColorSelector } from 'src/components/ColorSelector/ColorSelector';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { ControlsContainer } from '../components/ControlsContainer';
import { Section } from '../components/Section';
import { Header } from '../components/Header';
import { DeleteButton } from '../components/DeleteButton';

interface Props {
  id: string;
}

export const ConnectorControls = ({ id }: Props) => {
  const theme = useTheme();
  const sceneActions = useSceneStore((state) => {
    return state.actions;
  });
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const rectangle = useConnector(id);

  const onConnectorUpdated = useCallback(
    (updates: Partial<Connector>) => {
      sceneActions.updateConnector(id, updates);
    },
    [sceneActions, id]
  );

  const onConnectorDeleted = useCallback(() => {
    uiStateActions.setItemControls(null);
    sceneActions.deleteConnector(id);
  }, [sceneActions, id, uiStateActions]);

  return (
    <ControlsContainer header={<Header title="Connector settings" />}>
      <Section>
        <ColorSelector
          colors={Object.values(theme.customVars.diagramPalette)}
          onChange={(color) => {
            return onConnectorUpdated({ color });
          }}
          activeColor={rectangle.color}
        />
      </Section>
      <Section>
        <Box>
          <DeleteButton onClick={onConnectorDeleted} />
        </Box>
      </Section>
    </ControlsContainer>
  );
};
