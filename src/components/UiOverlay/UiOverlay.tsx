import React, { useCallback } from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import { UiElement } from 'components/UiElement/UiElement';
import { toPx } from 'src/utils';
import { SceneLayer } from 'src/components/SceneLayer/SceneLayer';
import { DragAndDrop } from 'src/components/DragAndDrop/DragAndDrop';
import { ItemControlsManager } from 'src/components/ItemControls/ItemControlsManager';
import { ToolMenu } from 'src/components/ToolMenu/ToolMenu';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { MainMenu } from 'src/components/MainMenu/MainMenu';
import { ZoomControls } from 'src/components/ZoomControls/ZoomControls';
import { useSceneStore } from 'src/stores/sceneStore';
import { DebugUtils } from 'src/components/DebugUtils/DebugUtils';

export const UiOverlay = () => {
  const theme = useTheme();
  const { appPadding } = theme.customVars;
  const spacing = useCallback(
    (multiplier: number) => {
      return parseInt(theme.spacing(multiplier), 10);
    },
    [theme]
  );
  const disableInteractions = useUiStateStore((state) => {
    return state.disableInteractions;
  });
  const debugMode = useUiStateStore((state) => {
    return state.debugMode;
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
  const hideMainMenu = useUiStateStore((state) => {
    return state.hideMainMenu;
  });

  if (disableInteractions) return null;

  return (
    <>
      {itemControls && (
        <UiElement
          sx={{
            position: 'absolute',
            top: appPadding.y * 2 + spacing(2),
            left: appPadding.x,
            width: '360px',
            maxHeight: `calc(100% - ${toPx(appPadding.y * 6)})`,
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          }}
        >
          <ItemControlsManager />
        </UiElement>
      )}

      <Box
        sx={{
          position: 'absolute',
          right: appPadding.x,
          top: appPadding.y
        }}
      >
        <ToolMenu />
      </Box>

      {mode.type === 'PLACE_ELEMENT' && mode.icon && (
        <SceneLayer>
          <DragAndDrop icon={mode.icon} tile={mouse.position.tile} />
        </SceneLayer>
      )}

      <Box
        sx={{
          position: 'absolute',
          left: appPadding.x,
          bottom: appPadding.y
        }}
      >
        <ZoomControls />
      </Box>

      {!hideMainMenu && (
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

      <UiElement
        sx={{
          position: 'absolute',
          bottom: appPadding.y,
          left: '50%',
          transform: 'translateX(-50%)',
          px: 2,
          py: 1,
          pointerEvents: 'none'
        }}
      >
        <Typography fontWeight={600} color="text.secondary">
          {sceneTitle}
        </Typography>
      </UiElement>

      {debugMode && (
        <UiElement
          sx={{
            position: 'absolute',
            width: 350,
            height: 400,
            maxWidth: '100%',
            left: appPadding.x,
            bottom: appPadding.y * 2 + spacing(2)
          }}
        >
          <DebugUtils />
        </UiElement>
      )}
    </>
  );
};
