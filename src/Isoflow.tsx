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
  ConnectorStyleEnum,
  InitialScene
} from 'src/types';
import { sceneToSceneInput } from 'src/utils';
import { useSceneStore, SceneProvider } from 'src/stores/sceneStore';
import { GlobalStyles } from 'src/styles/GlobalStyles';
import { Renderer } from 'src/components/Renderer/Renderer';
import { useWindowUtils } from 'src/hooks/useWindowUtils';
import { sceneInput as sceneValidationSchema } from 'src/validation/scene';
import { UiOverlay } from 'src/components/UiOverlay/UiOverlay';
import { UiStateProvider, useUiStateStore } from 'src/stores/uiStateStore';
import { INITIAL_SCENE } from 'src/config';
import { useIconCategories } from './hooks/useIconCategories';

interface Props {
  initialScene?: InitialScene;
  disableInteractions?: boolean;
  onSceneUpdated?: (scene: SceneInput) => void;
  width?: number | string;
  height?: number | string;
  debugMode?: boolean;
}

const App = ({
  initialScene,
  width,
  height = '100%',
  disableInteractions: disableInteractionsProp,
  onSceneUpdated,
  debugMode = false
}: Props) => {
  const prevInitialScene = useRef<SceneInput>(INITIAL_SCENE);
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
  const { setIconCategoriesState } = useIconCategories();

  useEffect(() => {
    uiActions.setZoom(initialScene?.zoom ?? 1);
    uiActions.setDisableInteractions(Boolean(disableInteractionsProp));
  }, [initialScene?.zoom, disableInteractionsProp, sceneActions, uiActions]);

  useEffect(() => {
    if (!initialScene || prevInitialScene.current === initialScene) return;

    const fullInitialScene = { ...INITIAL_SCENE, ...initialScene };

    prevInitialScene.current = fullInitialScene;
    sceneActions.setScene(fullInitialScene);

    setIsReady(true);
  }, [initialScene, sceneActions, uiActions]);

  useEffect(() => {
    setIconCategoriesState();
  }, [scene.icons, setIconCategoriesState]);

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
  const sceneActions = useSceneStore((state) => {
    return state.actions;
  });

  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });

  return {
    scene: sceneActions,
    uiState: uiStateActions
  };
};

export {
  useIsoflow,
  InitialScene,
  SceneInput,
  IconInput,
  NodeInput,
  RectangleInput,
  ConnectorInput,
  sceneValidationSchema,
  ConnectorStyleEnum
};

export const version = PACKAGE_VERSION;
export const initialScene = INITIAL_SCENE;

export default Isoflow;
