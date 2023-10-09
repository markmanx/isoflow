import React, { useState, useCallback } from 'react';
import { Menu, Typography, Divider, Card } from '@mui/material';
import {
  Menu as MenuIcon,
  GitHub as GitHubIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Download as DownloadIcon,
  FolderOpen as FolderOpenIcon,
  DeleteOutline as DeleteOutlineIcon
} from '@mui/icons-material';
import FileSaver from 'file-saver';
import { UiElement } from 'src/components/UiElement/UiElement';
import { IconButton } from 'src/components/IconButton/IconButton';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useSceneStore } from 'src/stores/sceneStore';
import { sceneToSceneInput } from 'src/utils';
import { INITIAL_SCENE } from 'src/config';
import { MenuItem } from './MenuItem';

export const MainMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMainMenuOpen = useUiStateStore((state) => {
    return state.isMainMenuOpen;
  });
  const scene = useSceneStore((state) => {
    return {
      title: state.title,
      icons: state.icons,
      nodes: state.nodes,
      connectors: state.connectors,
      textBoxes: state.textBoxes,
      rectangles: state.rectangles
    };
  });
  const setScene = useSceneStore((state) => {
    return state.actions.setScene;
  });
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });

  const onToggleMenu = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      uiStateActions.setIsMainMenuOpen(true);
    },
    [uiStateActions]
  );

  const gotoUrl = useCallback((url: string) => {
    window.open(url, '_blank');
  }, []);

  const onOpenScene = useCallback(async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/json';

    fileInput.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];

      if (!file) {
        throw new Error('No file selected');
      }

      const fileReader = new FileReader();

      fileReader.onload = async (e) => {
        const sceneInput = JSON.parse(e.target?.result as string);
        setScene(sceneInput);
      };
      fileReader.readAsText(file);

      uiStateActions.resetUiState();
    };

    await fileInput.click();
    uiStateActions.setIsMainMenuOpen(false);
  }, [setScene, uiStateActions]);

  const onSaveAs = useCallback(async () => {
    const parsedScene = sceneToSceneInput(scene);

    const blob = new Blob([JSON.stringify(parsedScene)], {
      type: 'application/json;charset=utf-8'
    });

    FileSaver.saveAs(blob, `isoflow-${new Date().toISOString()}.json`);
    uiStateActions.setIsMainMenuOpen(false);
  }, [scene, uiStateActions]);

  const onClearCanvas = useCallback(() => {
    setScene(INITIAL_SCENE);
    uiStateActions.resetUiState();
    uiStateActions.setIsMainMenuOpen(false);
  }, [uiStateActions, setScene]);

  return (
    <UiElement>
      <IconButton Icon={<MenuIcon />} name="Main menu" onClick={onToggleMenu} />

      <Menu
        anchorEl={anchorEl}
        open={isMainMenuOpen}
        onClose={() => {
          uiStateActions.setIsMainMenuOpen(false);
        }}
        elevation={0}
        sx={{
          mt: 2
        }}
        MenuListProps={{
          sx: {
            minWidth: '250px',
            py: 0
          }
        }}
      >
        <Card sx={{ py: 1 }}>
          <MenuItem onClick={onOpenScene} Icon={<FolderOpenIcon />}>
            Open
          </MenuItem>
          <MenuItem onClick={onSaveAs} Icon={<DownloadIcon />}>
            Download diagram
          </MenuItem>
          <MenuItem onClick={onClearCanvas} Icon={<DeleteOutlineIcon />}>
            Clear the canvas
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              return gotoUrl(`${REPOSITORY_URL}`);
            }}
            Icon={<GitHubIcon />}
          >
            GitHub
          </MenuItem>
          <MenuItem
            onClick={() => {
              return gotoUrl('https://discord.gg/QYPkvZth7D');
            }}
            Icon={<QuestionAnswerIcon />}
          >
            Discord
          </MenuItem>
          <Divider />
          <MenuItem>
            <Typography variant="body2" color="text.secondary">
              Isoflow v{PACKAGE_VERSION}
            </Typography>
          </MenuItem>
        </Card>
      </Menu>
    </UiElement>
  );
};
