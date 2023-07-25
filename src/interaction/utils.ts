import { Coords } from 'src/utils/Coords';
import { Mouse, Scroll } from 'src/stores/useUiStateStore';
import { getTileFromMouse } from 'src/renderer/utils/gridHelpers';

interface GetMousePositionFromToolEvent {
  toolEvent: paper.ToolEvent;
  gridSize: Coords;
  scroll: Scroll;
}

const getMousePositionFromToolEvent = ({
  toolEvent,
  gridSize,
  scroll
}: GetMousePositionFromToolEvent): Mouse['position'] => {
  const screenPosition = Coords.fromObject(toolEvent.point);
  const tile = getTileFromMouse({
    mousePosition: screenPosition,
    gridSize,
    scroll
  });

  return {
    screen: screenPosition,
    tile
  };
};

interface GetDeltaFromToolEvent {
  currentPosition: Mouse['position'];
  prevPosition: Mouse['position'];
}

const getDeltaFromToolEvent = ({
  currentPosition,
  prevPosition
}: GetDeltaFromToolEvent) => {
  const delta = currentPosition.screen.subtract(prevPosition.screen);

  if (delta.isEqual(Coords.zero())) {
    return null;
  }

  return {
    screen: delta,
    tile: currentPosition.tile.subtract(prevPosition.tile)
  };
};

interface GetMousedownFromToolEvent {
  toolEvent: paper.ToolEvent;
  currentTile: Coords;
  prevMouse: Mouse;
}

const getMousedownFromToolEvent = ({
  toolEvent,
  currentTile,
  prevMouse
}: GetMousedownFromToolEvent) => {
  if (toolEvent.type === 'mousedown') {
    return {
      screen: Coords.fromObject(toolEvent.point),
      tile: currentTile
    };
  }

  if (toolEvent.type === 'mousemove') {
    return prevMouse.mousedown;
  }

  return null;
};

type ToolEventToMouseEvent = GetMousePositionFromToolEvent & {
  prevMouse: Mouse;
};

export const toolEventToMouseEvent = ({
  toolEvent,
  gridSize,
  scroll,
  prevMouse
}: ToolEventToMouseEvent): Mouse => {
  const position = getMousePositionFromToolEvent({
    toolEvent,
    gridSize,
    scroll
  });
  const delta = getDeltaFromToolEvent({
    currentPosition: position,
    prevPosition: prevMouse.position
  });
  const mousedown = getMousedownFromToolEvent({
    toolEvent,
    currentTile: position.tile,
    prevMouse
  });

  return {
    position,
    delta,
    mousedown
  };
};
