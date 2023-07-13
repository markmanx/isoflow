import { useCallback, useRef, useState, useEffect } from "react";
import Paper, { Group, Shape } from "paper";
import gsap from "gsap";
import { useGrid } from "./useGrid";
import { useNodeManager } from "./useNodeManager";
import { SceneI } from "../../validation/SceneSchema";
import { Coords } from "../../utils/Coords";
import { useAppState } from "./useAppState";

const render = () => {
  if (Paper.view) {
    if (global.requestAnimationFrame) {
      global.requestAnimationFrame(render);
    }

    Paper.view.update();
  }
};

export const useRenderer = () => {
  const [isReady, setIsReady] = useState(false);
  const container = useRef<paper.Group>();
  const activeLayer = useRef<paper.Layer>();
  const grid = useGrid();
  const nodeManager = useNodeManager();
  const zoom = useAppState((state) => state.zoom);
  const scroll = useAppState((state) => state.scroll);

  const init = useCallback(
    (canvas: HTMLCanvasElement) => {
      destroy();

      Paper.settings = {
        insertItems: false,
        applyMatrix: false,
      };

      Paper.setup(canvas);
      activeLayer.current = Paper.project.activeLayer;

      container.current = new Group();
      const gridContainer = grid.init(51, 51);
      const nodeContainer = nodeManager.init();

      container.current.addChild(gridContainer);
      container.current.addChild(nodeContainer);
      activeLayer.current?.addChild(container.current);

      render();
      setIsReady(true);
    },
    [grid.init, nodeManager.init]
  );

  const loadScene = useCallback(
    (scene: SceneI) => {
      if (!container.current || !isReady) return;

      scene.nodes.forEach((node) => {
        nodeManager.createNode({
          ...node,
          position: new Coords(node.position.x, node.position.y),
        });
      });
    },
    [isReady, nodeManager.createNode]
  );

  useEffect(() => {
    if (!isReady || !activeLayer.current?.view) return;

    gsap.killTweensOf(activeLayer.current.view);
    gsap.to(activeLayer.current.view, {
      duration: 0.25,
      zoom,
    });
  }, [zoom, isReady]);

  useEffect(() => {
    if (!isReady || !activeLayer.current?.view || !container.current) return;

    const { center: viewCenter } = activeLayer.current.view.bounds;

    const newPosition = new Coords(
      scroll.position.x + viewCenter.x,
      scroll.position.y + viewCenter.y
    );

    container.current.position.set(newPosition.x, newPosition.y);
  }, [scroll]);

  const destroy = useCallback(() => {
    setIsReady(false);
    Paper.projects.forEach((project) => project.remove());
  }, []);

  return {
    init,
    container: container.current,
    grid,
    nodeManager,
    loadScene,
    scrollTo,
    isReady,
    destroy,
  };
};
