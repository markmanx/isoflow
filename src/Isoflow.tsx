import React, { useEffect, useState, useRef } from 'react';
import { shallow } from 'zustand/shallow';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import { theme } from 'src/styles/theme';
import {
  SceneInput,
  IconInput,
  NodeInput,
  ConnectorInput,
  RectangleInput,
  Scene,
  ConnectorStyleEnum,
  InitialData
} from 'src/types';
import { sceneToSceneInput } from 'src/utils';
import { useSceneStore, SceneProvider } from 'src/stores/sceneStore';
import { GlobalStyles } from 'src/styles/GlobalStyles';
import { Renderer } from 'src/components/Renderer/Renderer';
import { LabelContainer } from 'src/components/Nodes/Node/LabelContainer';
import { useWindowUtils } from 'src/hooks/useWindowUtils';
import { sceneInput as sceneValidationSchema } from 'src/validation/scene';
import { EMPTY_SCENE } from 'src/config';
import { UiOverlay } from 'src/components/UiOverlay/UiOverlay';
import { UiStateProvider, useUiStateStore } from 'src/stores/uiStateStore';

interface Props {
  initialData?: InitialData;
  disableInteractions?: boolean;
  onSceneUpdated?: (scene: SceneInput) => void;
  width?: number | string;
  height?: number | string;
  debugMode?: boolean;
}

const App = ({
  initialData,
  width,
  height = '100%',
  disableInteractions: disableInteractionsProp,
  onSceneUpdated,
  debugMode = false
}: Props) => {
  const previnitialData = useRef<SceneInput>(EMPTY_SCENE);
  const [isReady, setIsReady] = useState(false);
  useWindowUtils();
  const scene = useSceneStore(
    ({ nodes, connectors, textBoxes, rectangles, icons }) => {
      return { nodes, connectors, textBoxes, rectangles, icons };
    },
    shallow
  );
  const sceneActions = useSceneStore((state) => {
    return state.actions;
  });
  const uiActions = useUiStateStore((state) => {
    return state.actions;
  });

  useEffect(() => {
    uiActions.setZoom(initialData?.zoom ?? 1);
    uiActions.setDisableInteractions(Boolean(disableInteractionsProp));
  }, [initialData?.zoom, disableInteractionsProp, sceneActions, uiActions]);

  useEffect(() => {
    if (!initialData || previnitialData.current === initialData) return;

    previnitialData.current = initialData;
    sceneActions.setScene(initialData);
    setIsReady(true);
  }, [initialData, sceneActions]);

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
        <UiOverlay />
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
  InitialData,
  Scene,
  SceneInput,
  IconInput,
  NodeInput,
  RectangleInput,
  ConnectorInput,
  useIsoflow,
  LabelContainer,
  sceneValidationSchema,
  ConnectorStyleEnum
};
