import React from 'react';
import { Rectangle as RectangleI } from 'src/types';
import { Rectangle } from './Rectangle';

interface Props {
  rectangles: RectangleI[];
}

export const Rectangles = ({ rectangles }: Props) => {
  return (
    <>
      {[...rectangles].reverse().map((rectangle) => {
        return <Rectangle key={rectangle.id} {...rectangle} />;
      })}
    </>
  );
};
