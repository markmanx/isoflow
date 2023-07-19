import React from 'react';
import { Add as AddIcon } from '@mui/icons-material';
import { Coords } from 'src/utils/Coords';
import { ContextMenu } from './components/ContextMenu';
import { ContextMenuItem } from './components/ContextMenuItem';

interface Props {
  onAddNode: () => void;
  position: Coords;
}

export const TileContextMenu = ({ onAddNode, position }: Props) => (
  <ContextMenu position={position}>
    <ContextMenuItem onClick={onAddNode} icon={<AddIcon />} label="Add node" />
  </ContextMenu>
);
