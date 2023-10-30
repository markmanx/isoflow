import React, { useEffect, useState, useRef } from 'react';
import { shallow } from 'zustand/shallow';
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
  EditorConfig,
  Colors,
  Icons
} from 'src/types';
import { setWindowCursor, generateId } from 'src/utils';
import { modelSchema } from 'src/schemas/model';
import { useModelStore, ModelProvider } from 'src/stores/modelStore';
import { SceneProvider } from 'src/stores/sceneStore';
import { GlobalStyles } from 'src/styles/GlobalStyles';
import { Renderer } from 'src/components/Renderer/Renderer';
import { UiOverlay } from 'src/components/UiOverlay/UiOverlay';
import { UiStateProvider, useUiStateStore } from 'src/stores/uiStateStore';
import {
  INITIAL_DATA,
  MAIN_MENU_OPTIONS,
  INITIAL_UI_STATE,
  VIEW_DEFAULTS
} from 'src/config';
import { createView } from 'src/stores/reducers';
import { useView } from 'src/hooks/useView';
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
  const prevInitialData = useRef<Model>(INITIAL_DATA);
  const [isReady, setIsReady] = useState(false);
  const model = useModelStore((state) => {
    return state;
  }, shallow);
  const modelActions = useModelStore((state) => {
    return state.actions;
  });
  const uiActions = useUiStateStore((state) => {
    return state.actions;
  });
  const { setIconCategoriesState } = useIconCategories();
  const { changeView } = useView();

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

  useEffect(() => {
    if (!initialData || prevInitialData.current === initialData) return;
    setIsReady(false);

    let fullInitialData = { ...INITIAL_DATA, ...initialData };

    if (fullInitialData.views.length === 0) {
      const newView = {
        ...VIEW_DEFAULTS,
        id: generateId()
      };

      fullInitialData = createView(newView, fullInitialData);
    }

    prevInitialData.current = fullInitialData;
    modelActions.set(fullInitialData);

    changeView(fullInitialData.views[0].id, fullInitialData);
    setIsReady(true);
  }, [initialData, modelActions, uiActions, changeView]);

  useEffect(() => {
    setIconCategoriesState();
  }, [model.icons, setIconCategoriesState]);

  useEffect(() => {
    if (!isReady || !onModelUpdated) return;

    onModelUpdated(model);
  }, [model, onModelUpdated, isReady]);

  useEffect(() => {
    uiActions.setenableDebugTools(enableDebugTools);
  }, [enableDebugTools, uiActions]);

  if (!isReady) return null;

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
  InitialData,
  EditorConfig,
  Model,
  Icon,
  ModelItem,
  Rectangle,
  Colors,
  Icons,
  Connector,
  modelSchema,
  IsoflowProps
};

export const version = PACKAGE_VERSION;
export const initialData = INITIAL_DATA;

export default Isoflow;
