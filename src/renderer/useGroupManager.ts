import { useRef } from 'react';
import { Group } from 'paper';

export const useGroupManager = () => {
  const containerRef = useRef(new Group());

  return {
    container: containerRef.current
  };
};
