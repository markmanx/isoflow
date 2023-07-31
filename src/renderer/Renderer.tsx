import React, { useEffect, useState } from 'react';
import Paper from 'paper';
import gsap from 'gsap';
import { Coords } from 'src/utils/Coords';
import { useUiStateStore } from 'src/stores/useUiStateStore';
import { useSceneStore } from 'src/stores/useSceneStore';
import { useInteractionManager } from 'src/interaction/useInteractionManager';
import { clamp } from 'src/utils';
import { TILE_SIZE, PROJECTED_TILE_DIMENSIONS } from './utils/constants';
import { Initialiser } from './Initialiser';
import { useRenderer } from './useRenderer';
import { Node } from './components/Node/Node';
import { ContextMenuLayer } from './components/ContextMenuLayer/ContextMenuLayer';
import { Lasso } from './components/Lasso/Lasso';
import { Connector } from './components/Connector/Connector';
import { Group } from './components/Group/Group';
import { Grid } from './components/Grid/Grid';
import { Cursor } from './components/Cursor/Cursor';

const InitialisedRenderer = () => {
  const renderer = useRenderer();
  const [isReady, setIsReady] = useState(false);
  const scene = useSceneStore(({ nodes, connectors, groups }) => {
    return { nodes, connectors, groups };
  });
  const gridSize = useSceneStore((state) => {
    return state.gridSize;
  });
  const mode = useUiStateStore((state) => {
    return state.mode;
  });
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });
  const mouse = useUiStateStore((state) => {
    return state.mouse;
  });
  const scroll = useUiStateStore((state) => {
    return state.scroll;
  });
  const { activeLayer } = Paper.project;
  useInteractionManager();

  const {
    init: initRenderer,
    zoomTo,
    container: rendererContainer,
    scrollTo
  } = renderer;
  const { position: scrollPosition } = scroll;

  useEffect(() => {
    initRenderer();
    setIsReady(true);

    return () => {
      if (activeLayer) gsap.killTweensOf(activeLayer.view);
    };
  }, [initRenderer, activeLayer, gridSize.toString()]);

  useEffect(() => {
    zoomTo(zoom);
  }, [zoom, zoomTo]);

  useEffect(() => {
    const { center: viewCenter } = activeLayer.view.bounds;

    const newPosition = new Coords(
      scrollPosition.x + viewCenter.x,
      scrollPosition.y + viewCenter.y
    );

    rendererContainer.current.position.set(newPosition.x, newPosition.y);
  }, [scrollPosition, rendererContainer, activeLayer.view.bounds]);

  useEffect(() => {
    scrollTo(scrollPosition);
  }, [scrollPosition, scrollTo]);

  if (!isReady) return null;

  const screenToIso = ({ x, y }: { x: number; y: number }) => {
    const editorWidth = window.innerWidth;
    const editorHeight = window.innerHeight;

    // The origin is the center of the project.
    const projectPosition = {
      x: x - editorWidth * 0.5,
      y: y - editorHeight * 0.5
    };

    const tile = {
      x: Math.floor(
        (projectPosition.x + PROJECTED_TILE_DIMENSIONS.x) /
          PROJECTED_TILE_DIMENSIONS.x
      ),
      y: 0
    };

    return tile;

    // const canvasPosition = new Coords(
    //   x - scroll.position.x + editorWidth * 0.5,
    //   y -
    //     scroll.position.y +
    //     editorHeight * 0.5 +
    //     PROJECTED_TILE_DIMENSIONS.y * 0.5
    // );

    // const row = Math.floor(
    //   (((x - scroll.position.x) / PROJECTED_TILE_DIMENSIONS.x) * 0.5 +
    //     (canvasPosition.y / PROJECTED_TILE_DIMENSIONS.y) * 0.5) /
    //     2
    // );
    // const col = Math.floor(
    //   ((canvasPosition.y / PROJECTED_TILE_DIMENSIONS.y) * 0.5 -
    //     (canvasPosition.x / PROJECTED_TILE_DIMENSIONS.x) * 0.5) /
    //     2
    // );

    // const halfRowNum = Math.floor(gridSize.x * 0.5);
    // const halfColNum = Math.floor(gridSize.y * 0.5);

    // return new Coords(
    //   clamp(row, -halfRowNum, halfRowNum),
    //   clamp(col, -halfColNum, halfColNum)
    // );
  };

  const getTilePosition = ({ x, y }: { x: number; y: number }) => {
    const editorWidth = window.innerWidth;
    const editorHeight = window.innerHeight;

    const position = {
      x:
        editorWidth * 0.5 +
        PROJECTED_TILE_DIMENSIONS.x * x -
        PROJECTED_TILE_DIMENSIONS.x * y,
      y:
        editorHeight * 0.5 -
        (PROJECTED_TILE_DIMENSIONS.y * x + PROJECTED_TILE_DIMENSIONS.y * y)
    };

    return position;
  };

  return (
    <>
      <Grid tileSize={TILE_SIZE} scroll={scroll.position.toObject()} />
      <Cursor
        position={getTilePosition(
          screenToIso(mouse.position.screen.toObject())
        )}
        tileSize={TILE_SIZE}
      />
      {/* {mode.type === 'LASSO' && (
        <Lasso
          parentContainer={renderer.lassoContainer.current as paper.Group}
          startTile={mode.selection.startTile}
          endTile={mode.selection.endTile}
        />
      )}
      {scene.connectors.map((connector) => {
        return (
          <Connector
            key={connector.id}
            connector={connector}
            parentContainer={renderer.connectorManager.container as paper.Group}
          />
        );
      })}
      {scene.groups.map((group) => {
        return (
          <Group
            key={group.id}
            parentContainer={renderer.groupManager.container as paper.Group}
            group={group}
          />
        );
      })}
      {scene.nodes.map((node) => {
        return (
          <Node
            key={node.id}
            node={node}
            parentContainer={renderer.nodeManager.container as paper.Group}
          />
        );
      })} */}
    </>
  );
};

export const Renderer = () => {
  return (
    <Initialiser>
      <InitialisedRenderer />
      <ContextMenuLayer />
    </Initialiser>
  );
};
