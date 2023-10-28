import { produce } from 'immer';
import { Rectangle } from 'src/types';
import { getItemByIdOrThrow } from 'src/utils';
import { State } from './types';

export const updateRectangle = (
  id: string,
  updates: Partial<Rectangle>,
  viewId: string,
  state: State
): State => {
  const view = getItemByIdOrThrow(state.model.views, viewId);

  const newState = produce(state, (draft) => {
    const { rectangles } = draft.model.views[view.index];

    if (!rectangles) return;

    const rectangle = getItemByIdOrThrow(rectangles, id);
    const newRectangle = { ...rectangle.value, ...updates };
    rectangles[rectangle.index] = newRectangle;
  });

  return newState;
};

export const createRectangle = (
  newRectangle: Rectangle,
  viewId: string,
  state: State
): State => {
  const view = getItemByIdOrThrow(state.model.views, viewId);

  const newState = produce(state, (draft) => {
    const { rectangles } = draft.model.views[view.index];

    if (!rectangles) {
      draft.model.views[view.index].rectangles = [newRectangle];
    } else {
      draft.model.views[view.index].rectangles?.unshift(newRectangle);
    }
  });

  return updateRectangle(newRectangle.id, newRectangle, viewId, newState);
};

export const deleteRectangle = (
  id: string,
  viewId: string,
  state: State
): State => {
  const view = getItemByIdOrThrow(state.model.views, viewId);
  const rectangle = getItemByIdOrThrow(view.value.rectangles ?? [], id);

  const newState = produce(state, (draft) => {
    draft.model.views[view.index].rectangles?.splice(rectangle.index, 1);
  });

  return newState;
};
