import React from 'react';
import {
  ArrowRightAlt as ConnectIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useNode } from 'src/hooks/useNode';
import { ContextMenu } from './components/ContextMenu';
import { ContextMenuItem } from './components/ContextMenuItem';

interface Props {
  nodeId: string;
}

export const NodeContextMenu = ({ nodeId }: Props) => {
  const node = useNode(nodeId);

  if (!node) return null;

  return (
    <ContextMenu position={node.position}>
      <ContextMenuItem
        onClick={() => {}}
        icon={<ConnectIcon />}
        label="Connect"
      />
      <ContextMenuItem
        onClick={() => {}}
        icon={<DeleteIcon />}
        label="Remove"
      />
    </ContextMenu>
  );
};
