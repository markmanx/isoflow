import { produce } from 'immer';
import { TextBox } from 'src/types';
import { getItemByIdOrThrow, getTextWidth } from 'src/utils';
import {
  DEFAULT_FONT_FAMILY,
  TEXTBOX_DEFAULTS,
  TEXTBOX_FONT_WEIGHT
} from 'src/config';
import { State } from './types';

export const syncTextBox = (
  id: string,
  viewId: string,
  state: State
): State => {
  const newState = produce(state, (draft) => {
    const view = getItemByIdOrThrow(draft.model.views, viewId);
    const textBox = getItemByIdOrThrow(view.value.textBoxes ?? [], id);

    const width = getTextWidth(textBox.value.content, {
      fontSize: textBox.value.fontSize ?? TEXTBOX_DEFAULTS.fontSize,
      fontFamily: DEFAULT_FONT_FAMILY,
      fontWeight: TEXTBOX_FONT_WEIGHT
    });
    const height = 1;
    const size = { width, height };

    draft.scene.textBoxes[textBox.value.id] = { size };
  });

  return newState;
};

export const updateTextBox = (
  id: string,
  updates: Partial<TextBox>,
  viewId: string,
  state: State
): State => {
  const view = getItemByIdOrThrow(state.model.views, viewId);

  const newState = produce(state, (draft) => {
    const { textBoxes } = draft.model.views[view.index];

    if (!textBoxes) return;

    const textBox = getItemByIdOrThrow(textBoxes, id);
    const newTextBox = { ...textBox.value, ...updates };
    textBoxes[textBox.index] = newTextBox;

    if (updates.content !== undefined || updates.fontSize !== undefined) {
      const stateAfterSync = syncTextBox(newTextBox.id, viewId, draft);
      draft.model = stateAfterSync.model;
      draft.scene = stateAfterSync.scene;
    }
  });

  return newState;
};

export const createTextBox = (
  newTextBox: TextBox,
  viewId: string,
  state: State
): State => {
  const view = getItemByIdOrThrow(state.model.views, viewId);

  const newState = produce(state, (draft) => {
    const { textBoxes } = draft.model.views[view.index];

    if (!textBoxes) {
      draft.model.views[view.index].textBoxes = [newTextBox];
    } else {
      draft.model.views[view.index].textBoxes?.unshift(newTextBox);
    }
  });

  return updateTextBox(newTextBox.id, newTextBox, viewId, newState);
};

export const deleteTextBox = (
  id: string,
  viewId: string,
  state: State
): State => {
  const view = getItemByIdOrThrow(state.model.views, viewId);
  const textBox = getItemByIdOrThrow(view.value.textBoxes ?? [], id);

  const newState = produce(state, (draft) => {
    draft.model.views[view.index].textBoxes?.splice(textBox.index, 1);
  });

  return newState;
};
