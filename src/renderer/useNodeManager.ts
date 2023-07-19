import { useRef } from 'react';
import { Group } from 'paper';

export const useNodeManager = () => {
  const container = useRef(new Group());

  return {
    container: container.current
  };
};
