import { makeAutoObservable, observable } from "mobx";
import Paper, { Group } from "paper";
import gsap from "gsap";
import { Grid } from "./elements/Grid";
import { Cursor } from "./elements/Cursor";
import { PROJECTED_TILE_WIDTH, PROJECTED_TILE_HEIGHT } from "./constants";
import { clamp } from "../utils";
import { Nodes } from "./elements/Nodes";
import { SceneI, IconI } from "../validation/SceneSchema";
import { Coords } from "./elements/Coords";
import { OnSceneChange, SceneEventI } from "../types";

interface Config {
  icons: IconI[];
}

export class Renderer {
  activeLayer: paper.Layer;
  zoom = 1;

  config: Config = {
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
  scroll = {
    position: new Coords(0, 0),
    offset: new Coords(0, 0),
  };
  rafRef?: number;

  constructor(containerEl: HTMLDivElement) {
    makeAutoObservable(this, {
      scroll: observable,
    });

    Paper.settings = {
      insertItems: false,
      applyMatrix: false,
    };

    this.callbacks = {
      emitEvent: () => {},
    };

    this.domElements = {
      container: containerEl,
      canvas: this.initDOM(containerEl).canvas,
    };

    Paper.setup(this.domElements.canvas);

    this.sceneElements = {
      grid: new Grid(new Coords(51, 51), this),
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

    this.scrollTo(new Coords(0, 0));

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

    this.setZoom(1);
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

  getTileFromMouse(mouse: Coords) {
    const halfW = PROJECTED_TILE_WIDTH / 2;
    const halfH = PROJECTED_TILE_HEIGHT / 2;

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

  getTilePosition({ x, y }: Coords) {
    const halfW = PROJECTED_TILE_WIDTH * 0.5;
    const halfH = PROJECTED_TILE_HEIGHT * 0.5;

    return new Coords(x * halfW - y * halfW, x * halfH + y * halfH);
  }

  getTileBounds(coords: Coords) {
    const position = this.getTilePosition(coords);

    return {
      left: {
        x: position.x - PROJECTED_TILE_WIDTH * 0.5,
        y: position.y,
      },
      right: {
        x: position.x + PROJECTED_TILE_WIDTH * 0.5,
        y: position.y,
      },
      top: { x: position.x, y: position.y - PROJECTED_TILE_HEIGHT * 0.5 },
      bottom: { x: position.x, y: position.y + PROJECTED_TILE_HEIGHT * 0.5 },
      center: { x: position.x, y: position.y },
    };
  }

  getTileScreenPosition(position: Coords) {
    const { width: viewW, height: viewH } = Paper.view.bounds;
    const { offsetLeft: offsetX, offsetTop: offsetY } = this.domElements.canvas;
    const tilePosition = this.getTileBounds(position).center;
    const globalItemsGroupPosition = this.groups.elements.globalToLocal([0, 0]);
    const screenPosition = new Coords(
      (tilePosition.x +
        this.scroll.position.x +
        globalItemsGroupPosition.x +
        this.groups.elements.position.x +
        viewW * 0.5) *
        this.zoom +
        offsetX,

      (tilePosition.y +
        this.scroll.position.y +
        globalItemsGroupPosition.y +
        this.groups.elements.position.y +
        viewH * 0.5) *
        this.zoom +
        offsetY
    );

    return screenPosition;
  }

  setGrid(width: number, height: number) {}

  setZoom(zoom: number) {
    this.zoom = zoom;

    gsap.killTweensOf(Paper.view);
    gsap.to(Paper.view, {
      duration: 0.3,
      zoom: this.zoom,
      onComplete: () => {
        this.scrollTo(this.scroll.position);
      },
    });

    this.emitEvent({
      type: "ZOOM_CHANGED",
      data: { level: zoom },
    });
  }

  scrollTo(coords: Coords, opts?: { skipAnimation?: boolean }) {
    this.scroll.position.set(coords.x, coords.y);

    const { center: viewCenter } = Paper.view.bounds;

    const newPosition = new Coords(
      coords.x + viewCenter.x,
      coords.y + viewCenter.y
    );

    gsap.to(this.groups.elements.position, {
      duration: opts?.skipAnimation ? 0 : 0.25,
      ...newPosition,
    });
  }

  scrollToDelta(delta: Coords) {
    const position = this.scroll.position.add(delta);

    this.scrollTo(position);
  }

  scrollToTile(coords: Coords, opts?: { skipAnimation?: boolean }) {
    const tile = this.getTileBounds(coords).center;

    this.scrollTo(
      new Coords(
        -(tile.x - this.scroll.offset.x),
        -(tile.y - this.scroll.offset.y)
      ),
      opts
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

  getItemsByTile(coords: Coords) {
    const node = this.sceneElements.nodes.getNodeByTile(coords);

    return [node].filter((i) => Boolean(i));
  }
}
