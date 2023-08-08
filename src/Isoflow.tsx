import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import { theme } from 'src/styles/theme';
import { ToolMenu } from 'src/components/ToolMenu/ToolMenu';
import {
  SceneInput,
  IconInput,
  NodeInput,
  ConnectorInput,
  GroupInput,
  Scene
} from 'src/types';
import { useSceneStore, SceneProvider } from 'src/stores/sceneStore';
import { GlobalStyles } from 'src/styles/GlobalStyles';
import { Renderer } from 'src/components/Renderer/Renderer';
import { LabelContainer } from 'src/components/Node/LabelContainer';
import { useWindowUtils } from 'src/hooks/useWindowUtils';
import { ItemControlsManager } from './components/ItemControls/ItemControlsManager';
import { UiStateProvider, useUiStateStore } from './stores/uiStateStore';

interface Props {
  initialScene: SceneInput & {
    zoom?: number;
  };
  interactionsEnabled?: boolean;
  onSceneUpdated?: (scene: SceneInput, prevScene: SceneInput) => void;
  width?: number | string;
  height?: number | string;
}

const App = ({
  initialScene,
  width,
  height = 500,
  interactionsEnabled: interactionsEnabledProp = true,
  onSceneUpdated
}: Props) => {
  useWindowUtils();
  const sceneActions = useSceneStore((state) => {
    return state.actions;
  });
  const uiActions = useUiStateStore((state) => {
    return state.actions;
  });
  const interactionsEnabled = useUiStateStore((state) => {
    return state.interactionsEnabled;
  });

  useEffect(() => {
    uiActions.setZoom(initialScene.zoom ?? 1);
    uiActions.setInteractionsEnabled(interactionsEnabledProp);
  }, [initialScene.zoom, interactionsEnabledProp, sceneActions, uiActions]);

  useEffect(() => {
    sceneActions.setScene(initialScene);
  }, [initialScene, sceneActions]);

  return (
    <>
      <GlobalStyles />
      <Box
        sx={{
          width: width ?? '100%',
          height,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Renderer />
        <ItemControlsManager />
        {interactionsEnabled && <ToolMenu />}
      </Box>
    </>
  );
};

export const Isoflow = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <SceneProvider>
        <UiStateProvider>
          <App {...props} />
        </UiStateProvider>
      </SceneProvider>
    </ThemeProvider>
  );
};

const useIsoflow = () => {
  const updateNode = useSceneStore((state) => {
    return state.actions.updateNode;
  });

  return {
    updateNode
  };
};

export default Isoflow;

export {
  Scene,
  SceneInput,
  IconInput,
  NodeInput,
  GroupInput,
  ConnectorInput,
  useIsoflow,
  LabelContainer
};
