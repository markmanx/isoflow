import React, { useEffect, useState } from 'react';
import Paper from 'paper';
import gsap from 'gsap';
import { Coords } from 'src/utils/Coords';
import { useUiStateStore } from 'src/stores/useUiStateStore';
import { OriginEnum, clamp, getTilePosition } from 'src/utils';
import { useSceneStore } from 'src/stores/useSceneStore';
import { useInteractionManager } from 'src/interaction/useInteractionManager';
import { TILE_SIZE, PROJECTED_TILE_DIMENSIONS } from './utils/constants';
import { Initialiser } from './Initialiser';
import { useRenderer } from './useRenderer';
import { ContextMenuLayer } from './components/ContextMenuLayer/ContextMenuLayer';
import { Lasso } from './components/Lasso/Lasso';
import { Connector } from './components/Connector/Connector';
import { Group } from './components/Group/Group';
import { Grid } from './components/Grid/Grid';
import { Cursor } from './components/Cursor/Cursor';
import { NodeV2 } from './components/Node/NodeV2';

const InitialisedRenderer = () => {
  const renderer = useRenderer();
  const [isReady, setIsReady] = useState(false);
  const scene = useSceneStore(({ nodes, connectors, groups }) => {
    return { nodes, connectors, groups };
  });
  const gridSize = useSceneStore((state) => {
    return state.gridSize;
  });
  const icons = useSceneStore((state) => {
    return state.icons;
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
  useInteractionManager();

  return (
    <>
      <Grid tileSize={TILE_SIZE} scroll={scroll.position.toObject()} />
      {mode.type === 'CURSOR' && (
        <Cursor
          position={getTilePosition(mouse.position.tile, OriginEnum.TOP)}
          tileSize={TILE_SIZE}
        />
      )}
      {scene.nodes.map((node) => {
        return (
          <NodeV2
            key={node.id}
            position={getTilePosition(node.position, OriginEnum.BOTTOM)}
            iconUrl={
              icons.find((icon) => {
                return icon.id === node.iconId;
              })?.url
            }
          />
        );
      })}
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
