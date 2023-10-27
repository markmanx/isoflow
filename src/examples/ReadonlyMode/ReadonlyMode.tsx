import React from 'react';
import Isoflow from 'src/Isoflow';
import { initialData } from '../initialData';

export const ReadonlyMode = () => {
  return <Isoflow initialData={initialData} editorMode="EXPLORABLE_READONLY" />;
};
