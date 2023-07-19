import { Coords } from 'src/utils/Coords';
import { Mouse } from 'src/stores/useUiStateStore';

interface ToolEventToMouseEvent {
  toolEvent: paper.ToolEvent;
  mouse: Mouse;
}

export const toolEventToMouseEvent = ({
  toolEvent,
  mouse
}: ToolEventToMouseEvent) => {
  const position = new Coords(toolEvent.point.x, toolEvent.point.y);

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

  return {
    position,
    mouseDownAt,
    delta
  };
};
