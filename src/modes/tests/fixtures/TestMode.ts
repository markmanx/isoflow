import { MouseCoords, ModeContext } from "../../../types";
import { ModeBase } from "../../ModeBase";

export class TestMode extends ModeBase {
  entry() {}

  exit() {}

  TEST_EVENT() {}

  MOUSE_MOVE(e: MouseCoords) {}
}
