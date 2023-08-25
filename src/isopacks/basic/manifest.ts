import type { SceneInput } from 'src/types';
import { createCategoryIcon } from '../utils';
import Block from './icons/block.svg';
import Cube from './icons/cube.svg';
import Diamond from './icons/diamond.svg';
import Pyramid from './icons/pyramid.svg';
import Sphere from './icons/sphere.svg';

const createIcon = createCategoryIcon('Basic shapes');

export const basicIsopack: SceneInput['icons'] = [
  createIcon({
    id: 'block',
    name: 'Block',
    url: Block
  }),
  createIcon({
    id: 'cube',
    name: 'Cube',
    url: Cube
  }),
  createIcon({
    id: 'diamond',
    name: 'Diamond',
    url: Diamond
  }),
  createIcon({
    id: 'pyramid',
    name: 'Pyramid',
    url: Pyramid
  }),
  createIcon({
    id: 'sphere',
    name: 'Sphere',
    url: Sphere
  })
];
