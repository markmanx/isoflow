import React, { useCallback, useMemo } from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import { EditorModeEnum } from 'src/types';
import { UiElement } from 'components/UiElement/UiElement';
import { SceneLayer } from 'src/components/SceneLayer/SceneLayer';
import { DragAndDrop } from 'src/components/DragAndDrop/DragAndDrop';
import { ItemControlsManager } from 'src/components/ItemControls/ItemControlsManager';
import { ToolMenu } from 'src/components/ToolMenu/ToolMenu';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { MainMenu } from 'src/components/MainMenu/MainMenu';
import { ZoomControls } from 'src/components/ZoomControls/ZoomControls';
import { useSceneStore } from 'src/stores/sceneStore';
import { DebugUtils } from 'src/components/DebugUtils/DebugUtils';

const ToolsEnum = {
  MAIN_MENU: 'MAIN_MENU',
  ZOOM_CONTROLS: 'ZOOM_CONTROLS',
  TOOL_MENU: 'TOOL_MENU',
  ITEM_CONTROLS: 'ITEM_CONTROLS',
  SCENE_TITLE: 'SCENE_TITLE'
} as const;

interface EditorModeMapping {
  [k: string]: (keyof typeof ToolsEnum)[];
}

const EDITOR_MODE_MAPPING: EditorModeMapping = {
  [EditorModeEnum.EDITABLE]: [
    'ITEM_CONTROLS',
    'ZOOM_CONTROLS',
    'TOOL_MENU',
    'MAIN_MENU',
    'SCENE_TITLE'
  ],
  [EditorModeEnum.EXPLORABLE_READONLY]: ['ZOOM_CONTROLS', 'SCENE_TITLE'],
  [EditorModeEnum.NON_INTERACTIVE]: []
};

const getEditorModeMapping = (editorMode: keyof typeof EditorModeEnum) => {
  const availableUiFeatures = EDITOR_MODE_MAPPING[editorMode];

  return availableUiFeatures;
};

export const UiOverlay = () => {
  const theme = useTheme();
  const { appPadding } = theme.customVars;
  const spacing = useCallback(
    (multiplier: number) => {
      return parseInt(theme.spacing(multiplier), 10);
    },
    [theme]
  );
  const enableDebugTools = useUiStateStore((state) => {
    return state.enableDebugTools;
  });
  const mode = useUiStateStore((state) => {
    return state.mode;
  });
  const mouse = useUiStateStore((state) => {
    return state.mouse;
  });
  const itemControls = useUiStateStore((state) => {
    return state.itemControls;
  });
  const sceneTitle = useSceneStore((state) => {
    return state.title;
  });
  const editorMode = useUiStateStore((state) => {
    return state.editorMode;
  });
  const availableTools = useMemo(() => {
    return getEditorModeMapping(editorMode);
  }, [editorMode]);
  const rendererSize = useUiStateStore((state) => {
    return state.rendererSize;
  });

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          width: 0,
          height: 0,
          top: 0,
          left: 0,
          zIndex: 1
        }}
      >
        {availableTools.includes('ITEM_CONTROLS') && itemControls && (
          <UiElement
            sx={{
              position: 'absolute',
              top: appPadding.y * 2 + spacing(2),
              left: appPadding.x,
              width: '360px',
              overflowY: 'scroll',
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            }}
            style={{
              maxHeight: rendererSize.height - appPadding.y * 6
            }}
          >
            <ItemControlsManager />
          </UiElement>
        )}

        {availableTools.includes('TOOL_MENU') && (
          <Box
            style={{
              position: 'absolute',
              transform: 'translateX(-100%)',
              left: rendererSize.width - appPadding.x,
              top: appPadding.y
            }}
          >
            <ToolMenu />
          </Box>
        )}

        {availableTools.includes('ZOOM_CONTROLS') && (
          <Box
            style={{
              position: 'absolute',
              transformOrigin: 'bottom left',
              top: rendererSize.height - appPadding.y * 2,
              left: appPadding.x
            }}
          >
            <ZoomControls />
          </Box>
        )}

        {availableTools.includes('MAIN_MENU') && (
          <Box
            sx={{
              position: 'absolute',
              top: appPadding.y,
              left: appPadding.x
            }}
          >
            <MainMenu />
          </Box>
        )}

        {availableTools.includes('SCENE_TITLE') && (
          <Box
            sx={{
              position: 'absolute',
              display: 'flex',
              justifyContent: 'center',
              left: rendererSize.width / 2,
              top: rendererSize.height - appPadding.y * 2,
              width: rendererSize.width - 500,
              height: appPadding.y,
              transform: 'translateX(-50%)',
              pointerEvents: 'none'
            }}
          >
            <UiElement
              sx={{
                display: 'inline-flex',
                px: 2,
                alignItems: 'center',
                height: '100%'
              }}
            >
              <Typography fontWeight={600} color="text.secondary">
                {sceneTitle}
              </Typography>
            </UiElement>
          </Box>
        )}

        {enableDebugTools && (
          <UiElement
            sx={{
              position: 'absolute',
              width: 350,
              maxWidth: `calc(${rendererSize.width} - ${appPadding.x * 2}px)`,
              left: appPadding.x,
              top: rendererSize.height - appPadding.y * 2 - spacing(1),
              transform: 'translateY(-100%)'
            }}
          >
            <DebugUtils />
          </UiElement>
        )}
      </Box>
      {mode.type === 'PLACE_ELEMENT' && mode.icon && (
        <SceneLayer>
          <DragAndDrop icon={mode.icon} tile={mouse.position.tile} />
        </SceneLayer>
      )}
    </>
  );
};
