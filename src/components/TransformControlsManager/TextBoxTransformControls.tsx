import React, { useMemo } from 'react';
import { ProjectionOrientationEnum } from 'src/types';
import { CoordsUtils } from 'src/utils';
import { useTextBox } from 'src/hooks/useTextBox';
import { TransformControls } from './TransformControls';

interface Props {
  id: string;
}

export const TextBoxTransformControls = ({ id }: Props) => {
  const textBox = useTextBox(id);

  const to = useMemo(() => {
    if (textBox.orientation === ProjectionOrientationEnum.X) {
      return CoordsUtils.add(textBox.tile, {
        x: textBox.size.width,
        y: 0
      });
    }

    return CoordsUtils.add(textBox.tile, {
      x: 0,
      y: -textBox.size.width
    });
  }, [textBox.orientation, textBox.size.width, textBox.tile]);

  return <TransformControls from={textBox.tile} to={to} />;
};
