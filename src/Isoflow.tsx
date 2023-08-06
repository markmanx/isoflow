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
import { useSceneStore } from 'src/stores/useSceneStore';
import { GlobalStyles } from 'src/styles/GlobalStyles';
import { Renderer } from 'src/components/Renderer/Renderer';
import { sceneToSceneInput } from 'src/utils';
import { LabelContainer } from 'src/components/Node/LabelContainer';
import { useWindowUtils } from 'src/hooks/useWindowUtils';
import { ItemControlsManager } from './components/ItemControls/ItemControlsManager';
import { useUiStateStore } from './stores/useUiStateStore';

interface Props {
  initialScene: SceneInput & {
    zoom?: number;
    hideToolbar?: boolean;
  };
  onSceneUpdated?: (scene: SceneInput, prevScene: SceneInput) => void;
  width?: number | string;
  height?: number | string;
}

const Isoflow = ({
  initialScene,
  width,
  height = 500,
  onSceneUpdated
}: Props) => {
  useWindowUtils();
  const sceneActions = useSceneStore((state) => {
    return state.actions;
  });
  const uiActions = useUiStateStore((state) => {
    return state.actions;
  });

  useEffect(() => {
    uiActions.setZoom(initialScene.zoom ?? 1);
    uiActions.setToolbarVisibility(initialScene.hideToolbar ?? false);
    sceneActions.setScene(initialScene);
  }, [initialScene, sceneActions, uiActions]);

  useSceneStore.subscribe((scene, prevScene) => {
    if (!onSceneUpdated) return;

    onSceneUpdated(sceneToSceneInput(scene), sceneToSceneInput(prevScene));
  });

  return (
    <ThemeProvider theme={theme}>
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
        {!initialScene.hideToolbar && <ToolMenu />}
      </Box>
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
