import React from 'react';
import { useRectangle } from 'src/hooks/useRectangle';
import { TransformControls } from './TransformControls';

interface Props {
  id: string;
}

export const RectangleTransformControls = ({ id }: Props) => {
  const rectangle = useRectangle(id);

  return (
    <TransformControls
      showCornerAnchors
      from={rectangle.from}
      to={rectangle.to}
    />
  );
};
