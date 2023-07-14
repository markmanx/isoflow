import { PROJECTED_TILE_DIMENSIONS } from "../constants";
import { Coords } from "../../../utils/Coords";

export const getTileFromMouse(mouse: Coords, view: paper.View, scroll: Coords) {
    const halfW = PROJECTED_TILE_DIMENSIONS.x / 2;
    const halfH = PROJECTED_TILE_DIMENSIONS.y / 2;

    const canvasPosition = new Coords(
      mouse.x - this.groups.elements.position.x,
      mouse.y - this.groups.elements.position.y + halfH
    );

    const row = Math.floor(
      (canvasPosition.x / halfW + canvasPosition.y / halfH) / 2
    );
    const col = Math.floor(
      (canvasPosition.y / halfH - canvasPosition.x / halfW) / 2
    );

    const halfRowNum = Math.floor(this.sceneElements.grid.size.x * 0.5);
    const halfColNum = Math.floor(this.sceneElements.grid.size.y * 0.5);

    return new Coords(
      clamp(row, -halfRowNum, halfRowNum),
      clamp(col, -halfColNum, halfColNum)
    );
  }

  // gridsize, container.position = scroll + view, mouse