import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import { theme } from 'src/styles/theme';
import { IsoflowProps } from 'src/types';
import { setWindowCursor, modelFromModelStore } from 'src/utils';
import { useModelStore, ModelProvider } from 'src/stores/modelStore';
import { SceneProvider } from 'src/stores/sceneStore';
import { GlobalStyles } from 'src/styles/GlobalStyles';
import { Renderer } from 'src/components/Renderer/Renderer';
import { UiOverlay } from 'src/components/UiOverlay/UiOverlay';
import { UiStateProvider, useUiStateStore } from 'src/stores/uiStateStore';
import { INITIAL_DATA, MAIN_MENU_OPTIONS, NODE_SETTINGS_OPTIONS, TOOL_MENU_OPTIONS } from 'src/config';
import { useInitialDataManager } from 'src/hooks/useInitialDataManager';
import { useScene } from './hooks/useScene';

interface InnerAppProps {
  width: number | string;
  height: number | string;
  onModelUpdated?: IsoflowProps['onModelUpdated'];
  renderer: IsoflowProps['renderer'];
}

// The inner app exists so that the the scene is ready before using the useScene hook
const InnerApp = ({
  width,
  height,
  onModelUpdated,
  renderer,
}: InnerAppProps) => {
  const scene = useScene();
  const model = useModelStore((state) => {
    return modelFromModelStore(state);
  });

  useEffect(() => {
    if (!onModelUpdated) return;

    onModelUpdated(model, {scene});
  }, [JSON.stringify(model), onModelUpdated]);
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
        <Renderer {...renderer} />
        <UiOverlay />
      </Box>
    </>
  );
}

const App = ({
  initialData,
  mainMenuOptions = MAIN_MENU_OPTIONS,
  toolMenuOptions = TOOL_MENU_OPTIONS,
  nodeSettingsOptions = NODE_SETTINGS_OPTIONS,
  hiddenIcons = [],
  extraToolMenuOptions = null,
  nodeIndicatorComponent = () => <></>,
  width = '100%',
  height = '100%',
  onModelUpdated,
  enableDebugTools = false,
  editorMode = 'EDITABLE',
  renderer
}: IsoflowProps) => {
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const initialDataManager = useInitialDataManager();

  const { load } = initialDataManager;

  useEffect(() => {
    load({ ...INITIAL_DATA, ...initialData });
  }, [initialData, load]);

  useEffect(() => {
    uiStateActions.setEditorMode(editorMode);
    uiStateActions.setMainMenuOptions(mainMenuOptions);
    uiStateActions.setNodeIndicatorComponent(nodeIndicatorComponent);
    uiStateActions.setToolMenuOptions(toolMenuOptions);
    uiStateActions.setNodeSettingsOptions(nodeSettingsOptions);
    uiStateActions.setHiddenIcons(hiddenIcons);
    uiStateActions.setExtraToolMenuOptions(extraToolMenuOptions);
  }, [editorMode, uiStateActions, mainMenuOptions, toolMenuOptions, nodeSettingsOptions, hiddenIcons, extraToolMenuOptions, nodeIndicatorComponent]);

  useEffect(() => {
    return () => {
      setWindowCursor('default');
    };
  }, []);

  useEffect(() => {
    uiStateActions.setEnableDebugTools(enableDebugTools);
  }, [enableDebugTools, uiStateActions]);

  if (!initialDataManager.isReady) return null;

  return (
    <InnerApp
      width={width}
      height={height}
      onModelUpdated={onModelUpdated}
      renderer={renderer}
    />
  );
};

export const Isoflow = (props: IsoflowProps) => {
  return (
    <ThemeProvider theme={theme}>
      <ModelProvider>
        <SceneProvider>
          <UiStateProvider>
            <App {...props} />
          </UiStateProvider>
        </SceneProvider>
      </ModelProvider>
    </ThemeProvider>
  );
};

const useIsoflow = () => {
  const rendererEl = useUiStateStore((state) => {
    return state.rendererEl;
  });

  const ModelActions = useModelStore((state) => {
    return state.actions;
  });

  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });

  return {
    Model: ModelActions,
    uiState: uiStateActions,
    rendererEl
  };
};

export { useIsoflow };
export * from 'src/standaloneExports';
export default Isoflow;
