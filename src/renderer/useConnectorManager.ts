import { useRef } from 'react';
import { Group } from 'paper';

export const useConnectorManager = () => {
  const containerRef = useRef(new Group());

  return {
    container: containerRef.current
  };
};
