import { useEffect } from 'react';
import { useSceneStore } from 'src/stores/sceneStore';
import { useDiagramUtils } from 'src/hooks/useDiagramUtils';

export const useWindowUtils = () => {
  const scene = useSceneStore(({ nodes, groups, connectors, icons }) => {
    return {
      nodes,
      groups,
      connectors,
      icons
    };
  });
  const sceneActions = useSceneStore(({ actions }) => {
    return actions;
  });
  const { fitDiagramToScreen, getUnprojectedBounds } = useDiagramUtils();

  useEffect(() => {
    window.Isoflow = {
      getUnprojectedBounds,
      fitDiagramToScreen,
      setScene: sceneActions.setScene
    };
  }, [getUnprojectedBounds, fitDiagramToScreen, scene, sceneActions]);
};
