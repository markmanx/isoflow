import { useCallback, useRef, useEffect } from "react";
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
  const container = useRef(new Group());
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

    const gridContainer = grid.init(51, 51);

    container.current.addChild(gridContainer);
    container.current.addChild(nodeManager.container);
    activeLayer.current?.addChild(container.current);

    render();
  }, []);

  return {
    init,
    container: container.current,
    grid,
    nodeManager,
  };
};
