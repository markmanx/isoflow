import React from 'react';
import { useSceneStore } from 'src/stores/sceneStore';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { DEFAULT_COLOR } from 'src/config';
import { Rectangle } from './Rectangle/Rectangle';

export const Rectangles = () => {
  const rectangles = useSceneStore((state) => {
    return state.rectangles;
  });
  const mode = useUiStateStore((state) => {
    return state.mode;
  });

  return (
    <>
      {rectangles.map((rectangle) => {
        return <Rectangle key={rectangle.id} {...rectangle} />;
      })}
      {mode.type === 'RECTANGLE.DRAW' && mode.area && (
        <Rectangle
          from={mode.area.from}
          to={mode.area.to}
          color={DEFAULT_COLOR}
        />
      )}
    </>
  );
};
