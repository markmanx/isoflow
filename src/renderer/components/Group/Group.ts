import { useEffect, useMemo } from 'react';
import {
  Group as GroupInterface,
  useSceneStore,
  Node
} from 'src/stores/useSceneStore';
import { DEFAULT_COLOR } from 'src/config';
import { getColorVariant } from 'src/utils';
import { useGroup } from './useGroup';

interface GroupProps {
  group: GroupInterface;
  parentContainer: paper.Group;
}

export const Group = ({ group, parentContainer }: GroupProps) => {
  const { init, setTiles, setColor } = useGroup();
  const allNodes = useSceneStore((state) => {
    return state.nodes;
  });
  const groupNodes = useMemo(() => {
    const nodes = group.nodeIds.map((nodeId) => {
      return allNodes.find((node) => {
        return node.id === nodeId;
      });
    });

    return nodes.filter((node) => {
      return node !== undefined;
    }) as Node[];
  }, [allNodes, group.nodeIds]);

  useEffect(() => {
    const container = init();
    parentContainer.addChild(container);
  }, [init, parentContainer]);

  useEffect(() => {
    setTiles(
      groupNodes.map((node) => {
        return node.position;
      })
    );
  }, [groupNodes, setTiles]);

  useEffect(() => {
    setColor(DEFAULT_COLOR);
  }, [setColor]);

  return null;
};
