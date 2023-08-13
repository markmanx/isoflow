import React, { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
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
import { sceneToSceneInput } from 'src/utils';
import { useSceneStore, SceneProvider } from 'src/stores/sceneStore';
import { GlobalStyles } from 'src/styles/GlobalStyles';
import { Renderer } from 'src/components/Renderer/Renderer';
import { LabelContainer } from 'src/components/Node/LabelContainer';
import { useWindowUtils } from 'src/hooks/useWindowUtils';
import { sceneInput as sceneValidationSchema } from 'src/validation/scene';
import { ItemControlsManager } from './components/ItemControls/ItemControlsManager';
import { UiStateProvider, useUiStateStore } from './stores/uiStateStore';

interface Props {
  initialScene?: SceneInput & {
    zoom?: number;
  };
  interactionsEnabled?: boolean;
  onSceneUpdated?: (scene: SceneInput) => void;
  width?: number | string;
  height?: number | string;
  debugMode?: boolean;
}

const App = ({
  initialScene,
  width,
  height = 500,
  interactionsEnabled: interactionsEnabledProp = true,
  onSceneUpdated,
  debugMode = false
}: Props) => {
  const [isReady, setIsReady] = useState(false);
  useWindowUtils();
  const scene = useSceneStore(({ nodes, connectors, groups, icons }) => {
    return { nodes, connectors, groups, icons };
  }, shallow);
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
    uiActions.setZoom(initialScene?.zoom ?? 1);
    uiActions.setInteractionsEnabled(interactionsEnabledProp);
  }, [initialScene?.zoom, interactionsEnabledProp, sceneActions, uiActions]);

  useEffect(() => {
    if (!initialScene) return;

    sceneActions.setScene(initialScene);
    setIsReady(true);
  }, [initialScene, sceneActions]);

  useEffect(() => {
    if (!isReady || !onSceneUpdated) return;

    const sceneInput = sceneToSceneInput(scene);
    onSceneUpdated(sceneInput);
  }, [scene, onSceneUpdated, isReady]);

  useEffect(() => {
    uiActions.setDebugMode(debugMode);
  }, [debugMode, uiActions]);

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
  LabelContainer,
  sceneValidationSchema
};
