import { Model } from 'src/types';
import { icons } from './icons';
import { modelItems } from './modelItems';
import { views } from './views';

export const model: Model = {
  title: 'TestModel',
  description: 'TestModelDescription',
  version: '1.0.0',
  icons,
  items: modelItems,
  views
};
