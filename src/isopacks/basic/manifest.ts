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
    url: Block.toString()
  }),
  createIcon({
    id: 'cube',
    name: 'Cube',
    url: Cube.toString()
  }),
  createIcon({
    id: 'diamond',
    name: 'Diamond',
    url: Diamond.toString()
  }),
  createIcon({
    id: 'pyramid',
    name: 'Pyramid',
    url: Pyramid.toString()
  }),
  createIcon({
    id: 'sphere',
    name: 'Sphere',
    url: Sphere.toString()
  })
];
