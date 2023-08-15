import React from 'react';
import { Coords } from 'src/types';

interface Props {
  position: Coords;
  radius?: number;
}

export const Circle = ({
  position,
  radius,
  ...rest
}: Props & React.SVGProps<SVGCircleElement>) => {
  return <circle cx={position.x} cy={position.y} r={radius} {...rest} />;
};
