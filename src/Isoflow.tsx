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
import { sceneInputtoScene, sceneToSceneInput } from 'src/utils';
import { LabelContainer } from 'src/components/Node/LabelContainer';
import { ItemControlsManager } from './components/ItemControls/ItemControlsManager';

interface Props {
  initialScene: SceneInput;
  onSceneUpdated?: (scene: SceneInput, prevScene: SceneInput) => void;
  width?: number | string;
  height?: number | string;
}

const InnerApp = React.memo(
  ({ height, width }: Pick<Props, 'height' | 'width'>) => {
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
          <ToolMenu />
        </Box>
      </ThemeProvider>
    );
  }
);

const Isoflow = ({
  initialScene,
  width,
  height = 500,
  onSceneUpdated
}: Props) => {
  const sceneActions = useSceneStore((state) => {
    return state.actions;
  });

  useEffect(() => {
    const convertedInput = sceneInputtoScene(initialScene);
    sceneActions.set(convertedInput);
  }, [initialScene, sceneActions]);

  useSceneStore.subscribe((scene, prevScene) => {
    if (!onSceneUpdated) return;

    onSceneUpdated(sceneToSceneInput(scene), sceneToSceneInput(prevScene));
  });

  return <InnerApp height={height} width={width} />;
};

const useIsoflow = () => {
  const updateNode = useSceneStore((state) => {
    return state.actions.updateNode;
  });

  return {
    updateNode
  };
};

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

export default Isoflow;
