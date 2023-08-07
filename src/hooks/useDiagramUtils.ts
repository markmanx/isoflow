import { useCallback } from 'react';
import { useSceneStore } from 'src/stores/sceneStore';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { Size, Coords } from 'src/types';
import { getBoundingBox, getBoundingBoxSize, sortByPosition } from 'src/utils';
import { useGetTilePosition } from 'src/hooks/useGetTilePosition';

const BOUNDING_BOX_PADDING = 4;

export const useDiagramUtils = () => {
  const scene = useSceneStore(({ nodes, groups, connectors, icons }) => {
    return {
      nodes,
      groups,
      connectors,
      icons
    };
  });
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const { getTilePosition } = useGetTilePosition();

  const getDiagramBoundingBox = useCallback((): Size & Coords => {
    if (scene.nodes.length === 0) return { width: 0, height: 0, x: 0, y: 0 };

    const nodePositions = scene.nodes.map((node) => {
      return node.position;
    });

    const corners = getBoundingBox(nodePositions, {
      x: BOUNDING_BOX_PADDING,
      y: BOUNDING_BOX_PADDING
    });
    const cornerPositions = corners.map((corner) => {
      return getTilePosition({
        tile: corner
      });
    });
    const sortedCorners = sortByPosition(cornerPositions);
    const topLeft = { x: sortedCorners.lowX, y: sortedCorners.lowY };
    const size = getBoundingBoxSize(cornerPositions);

    return {
      width: size.width,
      height: size.height,
      x: topLeft.x,
      y: topLeft.y
    };
  }, [scene, getTilePosition]);

  const fitDiagramToScreen = useCallback(() => {
    const boundingBox = getDiagramBoundingBox();
    // const newZoom = Math.min(
    //   window.innerWidth / boundingBox.width,
    //   window.innerHeight / boundingBox.height
    // );

    uiStateActions.setScroll({
      offset: {
        x: 0,
        y: 0
      },
      position: {
        x: -(boundingBox.x + boundingBox.width / 2) + window.innerWidth / 2,
        y: -(boundingBox.y + boundingBox.height / 2) + window.innerHeight / 2
      }
    });
    // uiStateActions.setZoom(newZoom);
  }, [getDiagramBoundingBox, uiStateActions]);

  return {
    getDiagramBoundingBox,
    fitDiagramToScreen
  };
};
