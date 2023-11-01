import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import { theme } from 'src/styles/theme';
import {
  Model,
  ModelItem,
  Icon,
  Connector,
  Rectangle,
  IsoflowProps,
  InitialData,
  Colors,
  Icons
} from 'src/types';
import { setWindowCursor } from 'src/utils';
import { modelSchema } from 'src/schemas/model';
import { useModelStore, ModelProvider } from 'src/stores/modelStore';
import { SceneProvider } from 'src/stores/sceneStore';
import { GlobalStyles } from 'src/styles/GlobalStyles';
import { Renderer } from 'src/components/Renderer/Renderer';
import { UiOverlay } from 'src/components/UiOverlay/UiOverlay';
import { UiStateProvider, useUiStateStore } from 'src/stores/uiStateStore';
import { INITIAL_DATA, MAIN_MENU_OPTIONS, INITIAL_UI_STATE } from 'src/config';
import { useModel } from 'src/hooks/useModel';
import { useIconCategories } from './hooks/useIconCategories';

const App = ({
  initialData,
  mainMenuOptions = MAIN_MENU_OPTIONS,
  width = '100%',
  height = '100%',
  onModelUpdated,
  enableDebugTools = false,
  editorMode = 'EDITABLE'
}: IsoflowProps) => {
  const modelActions = useModelStore((state) => {
    return state.actions;
  });
  const uiActions = useUiStateStore((state) => {
    return state.actions;
  });
  const { setIconCategoriesState } = useIconCategories();
  const model = useModel();

  useEffect(() => {
    if (initialData?.zoom) {
      uiActions.setZoom(initialData.zoom);
    }

    if (initialData?.scroll) {
      uiActions.setScroll({
        position: initialData.scroll,
        offset: INITIAL_UI_STATE.scroll.offset
      });
    }

    uiActions.setEditorMode(editorMode);
    uiActions.setMainMenuOptions(mainMenuOptions);
  }, [
    initialData?.zoom,
    initialData?.scroll,
    editorMode,
    modelActions,
    uiActions,
    mainMenuOptions
  ]);

  useEffect(() => {
    return () => {
      setWindowCursor('default');
    };
  }, []);

  const { load } = model;

  useEffect(() => {
    load({ ...INITIAL_DATA, ...initialData });
  }, [initialData, load]);

  useEffect(() => {
    setIconCategoriesState();
  }, [model.icons, setIconCategoriesState]);

  useEffect(() => {
    if (!model.isReady || !onModelUpdated) return;

    onModelUpdated(model);
  }, [model, onModelUpdated, model.isReady]);

  useEffect(() => {
    uiActions.setenableDebugTools(enableDebugTools);
  }, [enableDebugTools, uiActions]);

  if (!model.isReady) return null;

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

export {
  useIsoflow,
  IsoflowProps,
  InitialData,
  Model,
  Icon,
  ModelItem,
  Rectangle,
  Colors,
  Icons,
  Connector,
  modelSchema
};

export const version = PACKAGE_VERSION;
export const initialData = INITIAL_DATA;

export default Isoflow;
