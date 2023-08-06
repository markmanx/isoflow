import { useEffect } from 'react';
import { useSceneStore } from 'src/stores/useSceneStore';
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
  const { fitDiagramToScreen, getDiagramBoundingBox } = useDiagramUtils();

  useEffect(() => {
    window.Isoflow = {
      getDiagramBoundingBox,
      fitDiagramToScreen,
      setScene: sceneActions.setScene
    };
  }, [getDiagramBoundingBox, fitDiagramToScreen, scene, sceneActions]);
};
