import React from 'react';
import { Add as AddIcon } from '@mui/icons-material';
import { Coords } from 'src/types';
import { ContextMenu } from './components/ContextMenu';
import { ContextMenuItem } from './components/ContextMenuItem';

interface Props {
  onAddNode: () => void;
  position: Coords;
}

export const EmptyTileContextMenu = ({ onAddNode, position }: Props) => {
  return (
    <ContextMenu position={position}>
      <ContextMenuItem
        onClick={onAddNode}
        icon={<AddIcon />}
        label="Add node"
      />
    </ContextMenu>
  );
};
