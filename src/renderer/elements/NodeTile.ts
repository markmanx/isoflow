import { Group, Shape, Color } from "paper";
import { PIXEL_UNIT, TILE_SIZE } from "../constants";
import chroma from "chroma-js";
import gsap from "gsap";
import { applyProjectionMatrix } from "../utils/projection";
import { theme } from "../../theme";

const TILE_PADDING = 10 * PIXEL_UNIT;
const TILE_STYLE = {
  radius: PIXEL_UNIT * 8,
  strokeCap: "round",
  strokeWidth: PIXEL_UNIT,
  size: [TILE_SIZE + TILE_PADDING * 2, TILE_SIZE + TILE_PADDING * 2],
  position: [0, 0],
};

export class NodeTile {
  container = new Group();

  color: string;

  renderElements = {
    tile: new Shape.Rectangle({}),
    focussedOutline: new Shape.Rectangle({}),
  };

  animations = {
    highlight: gsap
      .fromTo(
        this.renderElements.focussedOutline,
        { dashOffset: 0 },
        { dashOffset: PIXEL_UNIT * 12, ease: "none", duration: 0.25 }
      )
      .repeat(-1)
      .pause(),
  };

  constructor(color: string = theme.customVars.diagramPalette.purple) {
    this.color = color;

    const { tile, focussedOutline } = this.renderElements;

    this.renderElements.tile.set(TILE_STYLE);

    this.renderElements.focussedOutline.set({
      ...TILE_STYLE,
      radius: PIXEL_UNIT * 12,
      strokeWidth: PIXEL_UNIT * 3,
      pivot: [0, 0],
      dashArray: [PIXEL_UNIT * 6, PIXEL_UNIT * 6],
      scaling: 1.2,
      visible: false,
    });

    this.container.addChild(tile);
    this.container.addChild(focussedOutline);
    applyProjectionMatrix(this.container);

    this.setColor(this.color);
  }

  setFocus(state: boolean) {
    this.renderElements.focussedOutline.visible = state;
    this.animations.highlight.play();
  }

  setColor(color: string) {
    this.color = color;
    this.renderElements.tile.fillColor = new Color(color);
    this.renderElements.tile.strokeColor = new Color(
      chroma(color).darken(1.5).hex()
    );
    this.renderElements.focussedOutline.strokeColor = new Color(color);
  }
}
