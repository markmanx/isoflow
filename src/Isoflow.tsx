import React, { useEffect, useState, useRef } from 'react';
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
  RectangleInput,
  Scene
} from 'src/types';
import { sceneToSceneInput } from 'src/utils';
import { useSceneStore, SceneProvider } from 'src/stores/sceneStore';
import { GlobalStyles } from 'src/styles/GlobalStyles';
import { Renderer } from 'src/components/Renderer/Renderer';
import { LabelContainer } from 'src/components/Nodes/Node/LabelContainer';
import { useWindowUtils } from 'src/hooks/useWindowUtils';
import { sceneInput as sceneValidationSchema } from 'src/validation/scene';
import { EMPTY_SCENE } from 'src/config';
import { ItemControlsManager } from './components/ItemControls/ItemControlsManager';
import { UiStateProvider, useUiStateStore } from './stores/uiStateStore';
import { SceneLayer } from './components/SceneLayer/SceneLayer';
import { DragAndDrop } from './components/DragAndDrop/DragAndDrop';

interface Props {
  initialData?: SceneInput & {
    zoom?: number;
  };
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
  const scene = useSceneStore(({ nodes, connectors, rectangles, icons }) => {
    return { nodes, connectors, rectangles, icons };
  }, shallow);
  const sceneActions = useSceneStore((state) => {
    return state.actions;
  });
  const uiActions = useUiStateStore((state) => {
    return state.actions;
  });
  const disableInteractions = useUiStateStore((state) => {
    return state.disableInteractions;
  });
  const mode = useUiStateStore((state) => {
    return state.mode;
  });
  const mouse = useUiStateStore((state) => {
    return state.mouse;
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
        <ItemControlsManager />
        {disableInteractions && <ToolMenu />}
        {mode.type === 'PLACE_ELEMENT' && mode.icon && (
          <SceneLayer>
            <DragAndDrop icon={mode.icon} tile={mouse.position.tile} />
          </SceneLayer>
        )}
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
  RectangleInput,
  ConnectorInput,
  useIsoflow,
  LabelContainer,
  sceneValidationSchema
};
