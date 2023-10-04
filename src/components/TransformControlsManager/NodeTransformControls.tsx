import React from 'react';
import { useNode } from 'src/hooks/useNode';
import { TransformControls } from './TransformControls';

interface Props {
  id: string;
}

export const NodeTransformControls = ({ id }: Props) => {
  const node = useNode(id);

  return <TransformControls from={node.tile} to={node.tile} />;
};
