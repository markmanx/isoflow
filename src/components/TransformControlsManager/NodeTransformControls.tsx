import React from 'react';
import { useViewItem } from 'src/hooks/useViewItem';
import { TransformControls } from './TransformControls';

interface Props {
  id: string;
}

export const NodeTransformControls = ({ id }: Props) => {
  const node = useViewItem(id);

  return <TransformControls from={node.tile} to={node.tile} />;
};
