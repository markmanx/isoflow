import type { IconInput } from 'src/types';
import Block from './icons/block.svg';
import Cube from './icons/cube.svg';
import Diamond from './icons/diamond.svg';
import Pyramid from './icons/pyramid.svg';
import Sphere from './icons/sphere.svg';

const category = 'Basic shapes';

const basicIsopack: IconInput[] = [
  {
    id: 'block',
    name: 'Block',
    url: Block.toString(),
    category
  },
  {
    id: 'cube',
    name: 'Cube',
    url: Cube.toString(),
    category
  },
  {
    id: 'diamond',
    name: 'Diamond',
    url: Diamond.toString(),
    category
  },
  {
    id: 'pyramid',
    name: 'Pyramid',
    url: Pyramid.toString(),
    category
  },
  {
    id: 'sphere',
    name: 'Sphere',
    url: Sphere.toString(),
    category
  }
];

export default basicIsopack;
