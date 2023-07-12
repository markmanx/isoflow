import { useCallback, useRef, useState } from "react";
import Paper, { Group, Shape } from "paper";
import { useGrid } from "./useGrid";
import { useNodeManager } from "./useNodeManager";

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

  const init = useCallback((canvas: HTMLCanvasElement) => {
    Paper.projects.forEach((project) => project.remove());

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
  }, []);

  return {
    init,
    container: container.current,
    grid,
    nodeManager,
    isReady,
  };
};
