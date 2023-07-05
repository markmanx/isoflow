import { Group, Raster } from "paper";
import { PROJECTED_TILE_WIDTH, PIXEL_UNIT } from "../constants";
import { Context } from "../../types";

const NODE_IMG_PADDING = 0 * PIXEL_UNIT;

export class NodeIcon {
  container = new Group();
  ctx: Context;

  iconId: string;

  renderElements = {
    iconRaster: new Raster(),
  };

  constructor(iconId: string, ctx: Context) {
    this.ctx = ctx;
    this.iconId = iconId;
    this.container.addChild(this.renderElements.iconRaster);

    this.update(iconId);
  }

  async update(iconId: string) {
    const { iconRaster } = this.renderElements;

    this.iconId = iconId;

    const icon = this.ctx.getIconById(iconId);

    if (!icon) {
      return new Error("Icon not found");
    }

    await new Promise((resolve) => {
      iconRaster.onLoad = () => {
        iconRaster.scale(
          (PROJECTED_TILE_WIDTH - NODE_IMG_PADDING) / iconRaster.bounds.width
        );

        const raster = iconRaster.rasterize();
        this.container.removeChildren();

        this.renderElements.iconRaster = raster;
        this.container.addChild(raster);

        this.container.pivot = iconRaster.bounds.bottomCenter;

        resolve(null);
      };

      iconRaster.source = icon.url;
    });
  }

  export() {
    return { iconId: this.iconId };
  }
}
