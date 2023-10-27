import React, { useCallback } from 'react';
import { useRectangle } from 'src/hooks/useRectangle';
import { AnchorPosition } from 'src/types';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { TransformControls } from './TransformControls';

interface Props {
  id: string;
}

export const RectangleTransformControls = ({ id }: Props) => {
  const rectangle = useRectangle(id);
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });

  const onAnchorMouseDown = useCallback(
    (key: AnchorPosition) => {
      uiStateActions.setMode({
        type: 'RECTANGLE.TRANSFORM',
        id: rectangle.id,
        selectedAnchor: key,
        showCursor: false
      });
    },
    [rectangle.id, uiStateActions]
  );

  return (
    <TransformControls
      from={rectangle.from}
      to={rectangle.to}
      onAnchorMouseDown={onAnchorMouseDown}
    />
  );
};
