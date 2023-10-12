import React from 'react';
import Isoflow from 'src/Isoflow';
import { initialScene } from '../initialScene';

export const DebugTools = () => {
  return <Isoflow initialScene={initialScene} enableDebugTools height="100%" />;
};
