import { useCallback, useRef, useState } from "react";
import Paper, { Group, Shape } from "paper";
import { useGrid } from "./useGrid";

const render = () => {
  if (Paper.view) {
    if (global.requestAnimationFrame) {
      global.requestAnimationFrame(render);
    }

    Paper.view.update();
  }
};

export const useRenderer = () => {
  const grid = useGrid();
  const container = useRef(new Group());
  const activeLayer = useRef<paper.Layer>();

  const init = useCallback(
    (canvas: HTMLCanvasElement) => {
      Paper.projects.forEach((project) => project.remove());

      Paper.settings = {
        insertItems: false,
        applyMatrix: false,
      };

      Paper.setup(canvas);
      activeLayer.current = Paper.project.activeLayer;

      const gridContainer = grid.init(51, 51);
      container.current.addChild(gridContainer);

      activeLayer.current?.addChild(container.current);

      render();
    },
    [grid, activeLayer]
  );

  return {
    init,
    container: container.current,
  };
};
