import React, { useMemo } from 'react';
import {
  ArrowRightAlt as ConnectIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useSceneStore } from 'src/stores/useSceneStore';
import { ContextMenu } from './components/ContextMenu';
import { ContextMenuItem } from './components/ContextMenuItem';

interface Props {
  nodeId: string;
}

export const NodeContextMenu = ({ nodeId }: Props) => {
  const sceneItems = useSceneStore(({ nodes }) => ({ nodes }));
  const getNodeById = useSceneStore((state) => state.actions.getNodeById);
  const node = useMemo(
    () => getNodeById(nodeId),
    [getNodeById, nodeId, sceneItems]
  );

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
