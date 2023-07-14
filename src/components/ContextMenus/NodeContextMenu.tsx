import React from 'react';
import { ArrowRightAlt, Delete } from '@mui/icons-material';
import { useGlobalState } from '../../hooks/useGlobalState';
import { ContextMenu } from './ContextMenu';
import { ContextMenuItem } from './ContextMenuItem';
import { Node } from '../../renderer/elements/Node';

interface Props {
  node: Node;
}

export const NodeContextMenu = ({ node }: Props) => {
  const renderer = useGlobalState((state) => state.renderer);
  const position = renderer.getTileScreenPosition(node.position);

  return (
    <ContextMenu position={position}>
      <ContextMenuItem
        onClick={() => {}}
        icon={<ArrowRightAlt />}
        label="Connect"
      />
      <ContextMenuItem
        onClick={node.destroy}
        icon={<Delete />}
        label="Remove"
      />
    </ContextMenu>
  );
};
