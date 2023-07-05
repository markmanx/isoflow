import { makeAutoObservable, toJS } from "mobx";
import Paper, { Group } from "paper";
import gsap from "gsap";
import autobind from "auto-bind";
import { Grid } from "./elements/Grid";
import { Cursor } from "./elements/Cursor";
import { PROJECTED_TILE_WIDTH, PROJECTED_TILE_HEIGHT } from "./constants";
import { clamp } from "../utils";
import { Nodes } from "./elements/Nodes";
import { SceneI, IconI } from "../validation/SceneSchema";
import { OnSceneChange, SceneEventI } from "../types";

interface Config {
  grid: {
    width: number;
    height: number;
  };
  icons: IconI[];
}

export class Renderer {
  activeLayer: paper.Layer;
  zoom = 1;

  config: Config = {
    grid: {
      width: 51,
      height: 51,
    },
    icons: [],
  };
  callbacks: {
    emitEvent: OnSceneChange;
  };
  groups: {
    container: paper.Group;
    elements: paper.Group;
  };
  sceneElements: {
    grid: Grid;
    cursor: Cursor;
    nodes: Nodes;
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
    makeAutoObservable(this);
    autobind(this);

    Paper.settings = {
      insertelements: false,
      applyMatrix: false,
    };

    this.callbacks = {
      emitEvent: () => {},
    };

    this.domElements = {
      container: containerEl,
      ...this.initDOM(containerEl),
    };

    Paper.setup(this.domElements.canvas);

    this.sceneElements = {
      grid: new Grid(this),
      cursor: new Cursor(this),
      nodes: new Nodes(this),
    };

    this.groups = {
      container: new Group(),
      elements: new Group(),
    };

    this.groups.elements.addChild(this.sceneElements.grid.container);
    this.groups.elements.addChild(this.sceneElements.cursor.container);
    this.groups.elements.addChild(this.sceneElements.nodes.container);

    this.groups.container.addChild(this.groups.elements);
    this.groups.container.set({ position: [0, 0] });

    this.activeLayer = Paper.project.activeLayer;
    this.activeLayer.addChild(this.groups.container);

    this.scrollTo(0, 0);

    this.render();

    this.init();
  }

  init() {}

  setEventHandler(eventHandler: OnSceneChange) {
    this.callbacks.emitEvent = eventHandler;
  }

  loadScene(scene: SceneI) {
    this.config.icons = scene.icons;

    scene.nodes.forEach((node) => {
      this.sceneElements.nodes.addNode(node);
    });
  }

  getIconById(id: string) {
    const icon = this.config.icons.find((icon) => icon.id === id);

    if (!icon) {
      throw new Error(`Icon not found: ${id}`);
    }

    return icon;
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

  getTilePosition(x: number, y: number) {
    const halfW = PROJECTED_TILE_WIDTH * 0.5;
    const halfH = PROJECTED_TILE_HEIGHT * 0.5;

    return {
      x: x * halfW - y * halfW,
      y: x * halfH + y * halfH,
    };
  }

  getTileBounds(x: number, y: number) {
    const position = this.getTilePosition(x, y);

    return {
      left: {
        x: position.x - PROJECTED_TILE_WIDTH * 0.5,
        y: position.y - PROJECTED_TILE_HEIGHT * 0.5,
      },
      right: {
        x: position.x + PROJECTED_TILE_WIDTH * 0.5,
        y: position.y - PROJECTED_TILE_HEIGHT * 0.5,
      },
      top: { x: position.x, y: position.y - PROJECTED_TILE_HEIGHT },
      bottom: { x: position.x, y: position.y },
      center: { x: position.x, y: position.y - PROJECTED_TILE_HEIGHT * 0.5 },
    };
  }

  getTileScreenPosition(x: number, y: number) {
    const { width: viewW, height: viewH } = Paper.view.bounds;
    const { offsetLeft: offsetX, offsetTop: offsetY } = this.domElements.canvas;
    const tilePosition = this.getTileBounds(x, y).center;
    const globalItemsGroupPosition = this.groups.elements.globalToLocal([0, 0]);
    const screenPosition = {
      x:
        (tilePosition.x +
          this.scrollPosition.x +
          globalItemsGroupPosition.x +
          this.groups.elements.position.x +
          viewW * 0.5) *
          this.zoom +
        offsetX,
      y:
        (tilePosition.y +
          this.scrollPosition.y +
          globalItemsGroupPosition.y +
          this.groups.elements.position.y +
          viewH * 0.5) *
          this.zoom +
        offsetY,
    };

    return screenPosition;
  }

  setGrid(width: number, height: number) {}

  setZoom(zoom: number) {
    this.zoom = zoom;

    gsap.killTweensOf(Paper.view);
    gsap.to(Paper.view, {
      duration: 0.3,
      zoom: this.zoom,
    });

    this.emitEvent({
      type: "ZOOM_CHANGED",
      data: { level: zoom },
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

  unfocusAll() {
    this.sceneElements.nodes.unfocusAll();
  }

  clear() {
    this.sceneElements.nodes.clear();
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

  exportScene(): SceneI {
    const exported = {
      icons: this.config.icons,
      nodes: this.sceneElements.nodes.export(),
      groups: [],
      connectors: [],
    };

    return exported;
  }

  emitEvent(event: SceneEventI) {
    this.callbacks.emitEvent(event);
  }

  getItemsByTile(x: number, y: number) {
    const node = this.sceneElements.nodes.getNodeByTile(x, y);

    return [node].filter((i) => Boolean(i));
  }
}
