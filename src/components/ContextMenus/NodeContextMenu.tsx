import React from 'react';
import {
  ArrowRightAlt as ConnectIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { Coords } from 'src/utils/Coords';
import { ContextMenu } from './components/ContextMenu';
import { ContextMenuItem } from './components/ContextMenuItem';

interface Props {
  onConnect: () => void;
  onRemove: () => void;
  position: Coords;
}

export const NodeContextMenu = ({ onConnect, onRemove, position }: Props) => (
  <ContextMenu position={position}>
    <ContextMenuItem
      onClick={onConnect}
      icon={<ConnectIcon />}
      label="Connect"
    />
    <ContextMenuItem onClick={onRemove} icon={<DeleteIcon />} label="Remove" />
  </ContextMenu>
);
