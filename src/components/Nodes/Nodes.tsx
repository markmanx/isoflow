import React from 'react';
import { useSceneStore } from 'src/stores/sceneStore';
import { Node } from './Node/Node';

export const Nodes = () => {
  const nodes = useSceneStore((state) => {
    return state.nodes;
  });
  const icons = useSceneStore((state) => {
    return state.icons;
  });

  return (
    <>
      {nodes.map((node) => {
        return (
          <Node
            key={node.id}
            order={-node.position.x - node.position.y}
            node={node}
            icon={icons.find((icon) => {
              return icon.id === node.iconId;
            })}
          />
        );
      })}
    </>
  );
};
