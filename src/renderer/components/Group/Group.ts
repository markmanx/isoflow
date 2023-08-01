import { useEffect, useMemo } from 'react';
import { Node, Group as GroupI } from 'src/types';
import { useSceneStore } from 'src/stores/useSceneStore';
import { DEFAULT_COLOR } from 'src/config';

interface GroupProps {
  group: GroupI;
  parentContainer: paper.Group;
}

export const Group = ({ group, parentContainer }: GroupProps) => {
  const allNodes = useSceneStore((state) => {
    return state.nodes;
  });

  return null;
};
