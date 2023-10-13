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
  IsoflowProps,
  InitialScene
} from 'src/types';
import { sceneToSceneInput, setWindowCursor } from 'src/utils';
import { useSceneStore, SceneProvider } from 'src/stores/sceneStore';
import { GlobalStyles } from 'src/styles/GlobalStyles';
import { Renderer } from 'src/components/Renderer/Renderer';
import { useWindowUtils } from 'src/hooks/useWindowUtils';
import { sceneInput as sceneValidationSchema } from 'src/validation/scene';
import { UiOverlay } from 'src/components/UiOverlay/UiOverlay';
import { UiStateProvider, useUiStateStore } from 'src/stores/uiStateStore';
import { INITIAL_SCENE } from 'src/config';
import { useIconCategories } from './hooks/useIconCategories';

const App = ({
  initialScene,
  width = '100%',
  height = '100%',
  onSceneUpdated,
  enableDebugTools = false,
  editorMode = 'EDITABLE'
}: IsoflowProps) => {
  const prevInitialScene = useRef<SceneInput>(INITIAL_SCENE);
  const [isReady, setIsReady] = useState(false);
  useWindowUtils();
  const scene = useSceneStore(
    ({ title, nodes, connectors, textBoxes, rectangles, icons }) => {
      return { title, nodes, connectors, textBoxes, rectangles, icons };
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
    uiActions.setEditorMode(editorMode);
  }, [initialScene?.zoom, editorMode, sceneActions, uiActions]);

  useEffect(() => {
    return () => {
      setWindowCursor('default');
    };
  }, []);

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
    uiActions.setenableDebugTools(enableDebugTools);
  }, [enableDebugTools, uiActions]);

  return (
    <>
      <GlobalStyles />
      <Box
        sx={{
          width,
          height,
          position: 'relative',
          overflow: 'hidden',
          transform: 'translateZ(0)'
        }}
      >
        <Renderer />
        <UiOverlay />
      </Box>
    </>
  );
};

export const Isoflow = (props: IsoflowProps) => {
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
  sceneValidationSchema
};

export const version = PACKAGE_VERSION;
export const initialScene = INITIAL_SCENE;

export default Isoflow;
