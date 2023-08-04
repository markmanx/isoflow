import React from 'react';
import { Box } from '@mui/material';
import { useUiStateStore } from 'src/stores/useUiStateStore';
import { useSceneStore } from 'src/stores/useSceneStore';
import { useInteractionManager } from 'src/interaction/useInteractionManager';
import { Grid } from 'src/components/Grid/Grid';
import { Cursor } from 'src/components/Cursor/Cursor';
import { Node } from 'src/components/Node/Node';
import { Group } from 'src/components/Group/Group';
import { Node as NodeI } from 'src/types';

export const Renderer = () => {
  const scene = useSceneStore(({ nodes, connectors, groups }) => {
    return { nodes, connectors, groups };
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
    <Box
      sx={{
        width: '100%',
        height: '100%'
      }}
    >
      <Grid scroll={scroll} zoom={zoom} />
      {scene.groups.map((group) => {
        const nodes = group.nodeIds
          .map((nodeId) => {
            return scene.nodes.find((node) => {
              return node.id === nodeId;
            });
          })
          .filter((node) => {
            return node !== undefined;
          }) as NodeI[];

        return (
          <Group
            key={group.id}
            group={group}
            nodes={nodes}
            zoom={zoom}
            scroll={scroll}
          />
        );
      })}
      {mode.showCursor && (
        <Cursor tile={mouse.position.tile} zoom={zoom} scroll={scroll} />
      )}
      {scene.nodes.map((node) => {
        return (
          <Node
            key={node.id}
            node={node}
            iconUrl={
              icons.find((icon) => {
                return icon.id === node.iconId;
              })?.url
            }
            zoom={zoom}
            scroll={scroll}
          />
        );
      })}
    </Box>
  );
};
