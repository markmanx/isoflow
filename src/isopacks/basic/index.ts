import type { IconInput } from 'src/types';
import block from './icons/block.svg';
import cube from './icons/cube.svg';
import diamond from './icons/diamond.svg';
import pyramid from './icons/pyramid.svg';
import sphere from './icons/sphere.svg';

const category = 'Basic';

const BasicIsopack: IconInput[] = [
  {
    id: 'block',
    name: 'block',
    category,
    url: block.toString(),
    isIsometric: true
  },

  {
    id: 'cube',
    name: 'cube',
    category,
    url: cube.toString(),
    isIsometric: true
  },

  {
    id: 'diamond',
    name: 'diamond',
    category,
    url: diamond.toString(),
    isIsometric: true
  },

  {
    id: 'pyramid',
    name: 'pyramid',
    category,
    url: pyramid.toString(),
    isIsometric: true
  },

  {
    id: 'sphere',
    name: 'sphere',
    category,
    url: sphere.toString(),
    isIsometric: true
  }
];

export default BasicIsopack;
