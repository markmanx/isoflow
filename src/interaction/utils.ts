import { Coords } from 'src/utils/Coords';
import { Mouse, Scroll } from 'src/stores/useUiStateStore';
import { getTileFromMouse } from 'src/renderer/utils/gridHelpers';

interface ToolEventToMouseEvent {
  toolEvent: paper.ToolEvent;
  mouse: Mouse;
  gridSize: Coords;
  scroll: Scroll;
}

export const toolEventToMouseEvent = ({
  toolEvent,
  mouse,
  gridSize,
  scroll
}: ToolEventToMouseEvent) => {
  const position = Coords.fromObject(toolEvent.point);

  let mouseDownAt: Mouse['mouseDownAt'];

  switch (toolEvent.type) {
    case 'mousedown':
      mouseDownAt = position;
      break;
    case 'mouseup':
      mouseDownAt = null;
      break;
    default:
      mouseDownAt = mouse.mouseDownAt;
      break;
  }

  let delta: Coords | null = position.subtract(mouse.position);

  if (delta.x === 0 && delta.y === 0) delta = null;

  const tile = getTileFromMouse({
    mousePosition: position,
    gridSize,
    scroll
  });

  return {
    tile,
    position,
    mouseDownAt,
    delta
  };
};
