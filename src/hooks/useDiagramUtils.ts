import { useCallback } from 'react';
import { useSceneStore } from 'src/stores/sceneStore';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { Size, Coords, Node, TileOriginEnum } from 'src/types';
import { getBoundingBox, getBoundingBoxSize, sortByPosition } from 'src/utils';
import { useGetTilePosition } from 'src/hooks/useGetTilePosition';
import { useScroll } from 'src/hooks/useScroll';

const BOUNDING_BOX_PADDING = 0;

export const useDiagramUtils = () => {
  const scene = useSceneStore(({ nodes, groups, connectors, icons }) => {
    return {
      nodes,
      groups,
      connectors,
      icons
    };
  });
  const { scrollToTile } = useScroll();
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const scroll = useUiStateStore((state) => {
    return state.scroll;
  });
  const { getTilePosition } = useGetTilePosition();

  const getProjectBounds = useCallback((nodes: Node[]): Coords[] => {
    const nodePositions = nodes.map((node) => {
      return node.position;
    });

    const corners = getBoundingBox(nodePositions, {
      x: BOUNDING_BOX_PADDING,
      y: BOUNDING_BOX_PADDING
    });

    return corners;
  }, []);

  const getUnprojectedBounds = useCallback((): Size & Coords => {
    const projectBounds = getProjectBounds(scene.nodes);

    const cornerPositions = projectBounds.map((corner) => {
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
  }, [scene, getTilePosition, getProjectBounds]);

  const fitDiagramToScreen = useCallback(() => {
    const boundingBox = getProjectBounds(scene.nodes);
    const sortedCornerPositions = sortByPosition(boundingBox);
    const boundingBoxSize = getBoundingBoxSize(boundingBox);
    // const newZoom = Math.min(
    //   window.innerWidth / boundingBox.width,
    //   window.innerHeight / boundingBox.height
    // );

    const centralTile: Coords = {
      x: sortedCornerPositions.lowX + Math.floor(boundingBoxSize.width / 2),
      y: sortedCornerPositions.lowY + Math.floor(boundingBoxSize.height / 2)
    };
    scrollToTile(centralTile);
  }, [getProjectBounds, scene, scrollToTile]);

  return {
    getUnprojectedBounds,
    fitDiagramToScreen
  };
};
