import React from 'react';
import type { SceneInput } from 'src/types';
import { getIsoProjectionCss } from 'src/utils';
import { IconComponent } from 'src/types';
import { createCategoryIcon } from '../utils';
import EC2 from './icons/Arch_Amazon-EC2.svg';

const createIcon = createCategoryIcon('AWS');

const Node: IconComponent = ({ projectedTileSize }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: -projectedTileSize.width / 2,
        top: -projectedTileSize.height / 2,
        transformOrigin: 'top left',
        transform: getIsoProjectionCss(),
        userSelect: 'none'
      }}
    >
      <img
        src={EC2.toString()}
        alt="EC2"
        style={{ width: projectedTileSize.width * 0.7 }}
      />
    </div>
  );
};

export const awsIsopack: SceneInput['icons'] = [
  createIcon({
    id: 'ec2',
    name: 'EC2',
    url: EC2.toString(),
    component: Node
  })
];
