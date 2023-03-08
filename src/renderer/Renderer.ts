import Paper, { Group } from "paper";
import gsap from "gsap";
import { Grid } from "./elements/Grid";
import { Cursor } from "./elements/Cursor";
import { PROJECTED_TILE_WIDTH, PROJECTED_TILE_HEIGHT } from "./constants";
import { clamp } from "../utils";

export class Renderer {
  activeLayer: paper.Layer;
  zoom: number = 1;

  config = {
    grid: {
      width: 51,
      height: 51,
    },
  };
  groups: {
    container: paper.Group;
    elements: paper.Group;
  };
  sceneElements: {
    grid: Grid;
    cursor: Cursor;
  };
  domElements: {
    container: HTMLDivElement;
    canvas: HTMLCanvasElement;
  };
  scrollPosition = {
    x: 0,
    y: 0,
  };
  rafRef?: number;

  constructor(containerEl: HTMLDivElement) {
    Paper.settings = {
      insertelements: false,
      applyMatrix: false,
    };

    this.domElements = {
      container: containerEl,
      ...this.initDOM(containerEl),
    };

    Paper.setup(this.domElements.canvas);

    this.sceneElements = {
      grid: new Grid(this.config),
      cursor: new Cursor(this.config),
    };

    this.groups = {
      container: new Group(),
      elements: new Group(),
    };

    this.groups.elements.addChild(this.sceneElements.grid.container);
    this.groups.elements.addChild(this.sceneElements.cursor.container);

    this.groups.container.addChild(this.groups.elements);
    this.groups.container.set({ position: [0, 0] });

    this.activeLayer = Paper.project.activeLayer;
    this.activeLayer.addChild(this.groups.container);

    this.scrollTo(0, 0);

    this.render();
  }

  initDOM(containerEl: HTMLDivElement) {
    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.left = "0";
    canvas.style.top = "0";
    canvas.setAttribute("resize", "true");
    containerEl.appendChild(canvas);

    return { canvas };
  }

  getTileFromMouse(_mouseX: number, _mouseY: number) {
    const halfW = PROJECTED_TILE_WIDTH / 2;
    const halfH = PROJECTED_TILE_HEIGHT / 2;

    const mouseX =
      (_mouseX - this.groups.elements.position.x) * (1 / this.zoom);
    const mouseY =
      (_mouseY - this.groups.elements.position.y) * (1 / this.zoom) + halfH;

    const row = Math.floor((mouseX / halfW + mouseY / halfH) / 2);
    const col = Math.floor((mouseY / halfH - mouseX / halfW) / 2);

    const halfRowNum = Math.floor(this.config.grid.width * 0.5);
    const halfColNum = Math.floor(this.config.grid.height * 0.5);

    return {
      x: clamp(row, -halfRowNum, halfRowNum),
      y: clamp(col, -halfColNum, halfColNum),
    };
  }

  setGrid(width: number, height: number) {}

  setZoom(zoom: number) {
    this.zoom = zoom;

    gsap.killTweensOf(Paper.view);
    gsap.to(Paper.view, {
      duration: 0.3,
      zoom: this.zoom,
    });
  }

  scrollTo(x: number, y: number) {
    this.scrollPosition = { x, y };

    const { center: viewCenter } = Paper.view.bounds;

    const newPosition = {
      x: x + viewCenter.x,
      y: y + viewCenter.y,
    };

    gsap.to(this.groups.elements.position, {
      duration: 0,
      ...newPosition,
    });
  }

  scrollToDelta(deltaX: number, deltaY: number) {
    this.scrollTo(
      this.scrollPosition.x + deltaX * (1 / this.zoom),
      this.scrollPosition.y + deltaY * (1 / this.zoom)
    );
  }

  destroy() {
    this.domElements.canvas.remove();

    if (this.rafRef !== undefined) global.cancelAnimationFrame(this.rafRef);
  }

  render() {
    if (Paper.view) {
      if (global.requestAnimationFrame) {
        this.rafRef = global.requestAnimationFrame(this.render.bind(this));
      }

      Paper.view.update();
    }
  }
}
