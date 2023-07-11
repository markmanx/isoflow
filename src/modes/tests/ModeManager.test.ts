import { ModeManager } from "../ModeManager";
import { Renderer } from "../../renderer/Renderer";
import { TestMode } from "./fixtures/TestMode";

jest.mock("paper", () => ({
  Tool: jest.fn().mockImplementation(() => ({})),
}));
jest.mock("../../renderer/Renderer", () => ({
  Renderer: jest.fn(),
}));

describe("Mode manager functions correctly", () => {
  it("Activating a mode works correctly", () => {
    const entrySpy = jest.spyOn(TestMode.prototype, "entry");
    const exitSpy = jest.spyOn(TestMode.prototype, "exit");
    const eventSpy = jest.spyOn(TestMode.prototype, "TEST_EVENT");
    const mouseEventSpy = jest.spyOn(TestMode.prototype, "MOUSE_MOVE");
    const renderer = new Renderer({} as unknown as HTMLDivElement);
    const modeManager = new ModeManager();
    modeManager.setRenderer(renderer);
    modeManager.activateMode(TestMode);

    modeManager.send("TEST_EVENT");
    modeManager.send("TEST_EVENT");
    modeManager.send("MOUSE_MOVE", { x: 10, y: 10 });

    expect(entrySpy).toHaveBeenCalled();
    expect(eventSpy).toHaveBeenCalledTimes(2);
    expect(mouseEventSpy).toHaveBeenCalledWith({
      x: 10,
      y: 10,
    });

    modeManager.activateMode(TestMode);
    expect(exitSpy).toHaveBeenCalled();
  });
});
