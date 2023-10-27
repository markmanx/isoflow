import React from 'react';
import Isoflow from 'src/Isoflow';
import { initialData } from '../initialData';

export const DebugTools = () => {
  return <Isoflow initialData={initialData} enableDebugTools height="100%" />;
};
