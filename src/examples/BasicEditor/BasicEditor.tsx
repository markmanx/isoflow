import React from 'react';
import Isoflow from 'src/Isoflow';
import icons from '../icons';

export const BasicEditor = () => {
  return (
    <Isoflow
      initialData={{
        icons,
        nodes: [],
        connectors: [],
        rectangles: []
      }}
      height="100%"
    />
  );
};
