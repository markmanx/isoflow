import { ModeManager } from "../ModeManager";
import { Renderer } from "../../renderer/Renderer";
import { Select } from "../Select";
import { CreateLasso } from "../CreateLasso";
import { SelectNode } from "../SelectNode";
import { Coords } from "../../renderer/elements/Coords";
import { Node } from "../../renderer/elements/Node";
import * as utils from "../utils";

jest.mock("paper", () => ({
  Tool: jest.fn().mockImplementation(() => ({})),
}));
jest.mock("../utils", () => ({
  getTargetFromSelection: jest.fn(),
}));
jest.mock("../../renderer/elements/Cursor", () => ({
  CURSOR_TYPES: {
    TILE: "TILE",
  },
}));
jest.mock("../../renderer/Renderer", () => ({
  Renderer: jest.fn().mockImplementation(() => ({
    getTileFromMouse: (coords: Coords) => coords,
    getItemsByTile: jest.fn(() => []),
    unfocusAll: jest.fn(),
    sceneElements: {
      cursor: {
        displayAt: jest.fn(),
        setVisible: jest.fn(),
        setCursorType: jest.fn(),
        createSelection: jest.fn(),
      },
    },
  })),
}));
jest.mock("../../renderer/elements/Node", () => ({
  Node: jest.fn().mockImplementation(() => ({
    type: "NODE",
    isFocussed: false,
    setFocus: jest.fn(),
    moveTo: jest.fn(),
  })),
}));

const MockNode = Node as jest.Mock<Node>;

const createRenderer = () => {
  const renderer = new Renderer({} as unknown as HTMLDivElement);
  const modeManager = new ModeManager();

  modeManager.setRenderer(renderer);
  modeManager.activateMode(Select);

  return { renderer, modeManager };
};

describe("Select mode functions correctly", () => {
  it("Cursor repositions when tile is hovered", () => {
    const { renderer, modeManager } = createRenderer();
    const displayAtSpy = jest.spyOn(renderer.sceneElements.cursor, "displayAt");
    modeManager.send("MOUSE_MOVE", {
      position: new Coords(2, 2),
      delta: null,
    });
    expect(displayAtSpy).toHaveBeenCalled();
    expect(displayAtSpy.mock.calls[1][0]).toStrictEqual(new Coords(2, 2));
  });

  it("Node gains focus when mouse hovers over it", () => {
    const { modeManager } = createRenderer();
    const mockNode = new MockNode();
    jest.spyOn(utils, "getTargetFromSelection").mockReturnValueOnce(mockNode);
    modeManager.send("MOUSE_MOVE", {
      position: new Coords(1, 1),
      delta: null,
    });
    expect(mockNode.setFocus).toHaveBeenCalled();
  });
  it("All focussed elements reset when user hovers over a different tile", () => {
    const { renderer, modeManager } = createRenderer();
    jest.spyOn(utils, "getTargetFromSelection").mockReturnValueOnce(null);
    const unfocusAllSpy = jest.spyOn(renderer, "unfocusAll");
    modeManager.send("MOUSE_MOVE", {
      position: new Coords(1, 1),
      delta: null,
    });
    expect(unfocusAllSpy).toHaveBeenCalled();
  });
  it("Activates multiselect mode when mouse is dragged (dragging must start from an empty tile)", () => {
    const activateModeSpy = jest.spyOn(ModeManager.prototype, "activateMode");
    const { modeManager } = createRenderer();
    jest.spyOn(utils, "getTargetFromSelection").mockReturnValue(null);
    modeManager.send("MOUSE_DOWN", {
      position: new Coords(0, 0),
      delta: null,
    });
    modeManager.send("MOUSE_MOVE", {
      position: new Coords(2, 2),
      delta: new Coords(2, 2),
    });
    expect(activateModeSpy).toHaveBeenCalledTimes(2);
    expect(activateModeSpy.mock.calls[1][0]).toStrictEqual(CreateLasso);
  });
  it("Activates Node selection mode when user clicks on a node", () => {
    const activateModeSpy = jest.spyOn(ModeManager.prototype, "activateMode");
    const { modeManager } = createRenderer();
    const mockNode = new MockNode();
    jest.spyOn(utils, "getTargetFromSelection").mockReturnValue(mockNode);
    modeManager.send("MOUSE_DOWN", {
      position: new Coords(0, 0),
      delta: null,
    });
    expect(activateModeSpy).toHaveBeenCalledTimes(2);
    expect(activateModeSpy.mock.calls[1][0]).toStrictEqual(SelectNode);
  });
});
