import React from 'react';
import type { SceneInput } from 'src/types';
import { getIsoProjectionCss } from 'src/utils';
import { createCategoryIcon } from '../utils';
import Block from './icons/block.svg';
import EC2 from './icons/Arch_Amazon-EC2.svg';

const createIcon = createCategoryIcon('AWS');

export const awsIsopack: SceneInput['icons'] = [
  createIcon({
    id: 'ec2',
    name: 'EC2',
    url: EC2.toString(),
    component: (
      <>
        <img
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 200
          }}
          src={Block.toString()}
          alt="Block"
        />
        <img
          style={{
            position: 'absolute',
            top: -2,
            left: 54,
            width: 91,
            transform: getIsoProjectionCss()
          }}
          src={EC2.toString()}
          alt="EC2"
        />
      </>
    )
  })
];
