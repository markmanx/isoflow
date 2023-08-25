import React from 'react';
import Isoflow from 'src/Isoflow';
import { initialData } from '../initialData';

export const DebugTools = () => {
  return <Isoflow initialData={initialData} debugMode height="100%" />;
};
