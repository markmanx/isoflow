import React from 'react';
import { NodeContextMenu } from './NodeContextMenu';
import { TileContextMenu } from './TileContextMenu';

export const ContextMenu = () => {
  const targetElement = useGlobalState((state) => state.showContextMenuFor);

  if (!targetElement) {
    return null;
  }

  if (targetElement instanceof Node) {
    return <NodeContextMenu node={targetElement} key={targetElement.id} />;
  }

  if (targetElement instanceof Coords) {
    return (
      <TileContextMenu
        tile={targetElement}
        key={JSON.stringify(targetElement)}
      />
    );
  }

  return null;
};
