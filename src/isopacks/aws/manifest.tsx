import React from 'react';
import type { SceneInput } from 'src/types';
import { createCategoryIcon } from '../utils';
import EC2 from './icons/Arch_Amazon-EC2.svg';

const createIcon = createCategoryIcon('AWS');

export const awsIsopack: SceneInput['icons'] = [
  createIcon({
    id: 'ec2',
    name: 'EC2',
    url: EC2,
    component: <>Hello</>
  })
];
