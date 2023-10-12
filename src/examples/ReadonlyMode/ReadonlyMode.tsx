import React from 'react';
import Isoflow from 'src/Isoflow';
import { initialScene } from '../initialScene';

export const ReadonlyMode = () => {
  return (
    <Isoflow initialScene={initialScene} editorMode="EXPLORABLE_READONLY" />
  );
};
