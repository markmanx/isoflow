import React from 'react';
import Isoflow from 'src/Isoflow';
import { icons } from '../icons';

export const BasicEditor = () => {
  return (
    <Isoflow
      initialScene={{
        icons,
        nodes: [],
        connectors: [],
        groups: []
      }}
      height="100%"
    />
  );
};
