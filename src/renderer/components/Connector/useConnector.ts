import { useCallback, useRef } from 'react';
import { Group } from 'paper';

export const useConnector = () => {
  const containerRef = useRef(new Group());

  const init = useCallback(() => {
    containerRef.current.removeChildren();

    return containerRef.current;
  }, []);

  return {
    init
  };
};
