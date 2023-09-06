import React from 'react';
import type { SceneInput } from 'src/types';
import { getIsoProjectionCss } from 'src/utils';
import { NodeImageIcon } from 'src/components/SceneLayers/Nodes/Node/IconTypes/NodeImageIcon';
import { createCategoryIcon } from '../utils';
import Block from './icons/block.svg';
import EC2 from './icons/Arch_Amazon-EC2.svg';

const createIcon = createCategoryIcon('AWS');

const Node = () => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          transform: getIsoProjectionCss(),
          left: 40,
          top: -10
        }}
      >
        <NodeImageIcon url={EC2.toString()} />
      </div>
      {/* <img
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 200
        }}
        src={Block.toString()}
        alt="Block"
      /> */}
      {/* <img
        style={{
          position: 'absolute',
          top: -2,
          left: 54,
          width: 91,
          transform: getIsoProjectionCss()
        }}
        src={EC2.toString()}
        alt="EC2"
      /> */}
    </>
  );
};

export const awsIsopack: SceneInput['icons'] = [
  createIcon({
    id: 'ec2',
    name: 'EC2',
    url: EC2.toString(),
    component: <Node />
  })
];
