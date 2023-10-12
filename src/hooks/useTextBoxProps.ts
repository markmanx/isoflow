import { useMemo } from 'react';
import { TextBox } from 'src/types';
import {
  UNPROJECTED_TILE_SIZE,
  DEFAULT_FONT_FAMILY,
  TEXTBOX_DEFAULTS
} from 'src/config';

export const useTextBoxProps = (textBox: TextBox) => {
  const fontProps = useMemo(() => {
    return {
      fontSize: UNPROJECTED_TILE_SIZE * textBox.fontSize,
      fontFamily: DEFAULT_FONT_FAMILY,
      fontWeight: TEXTBOX_DEFAULTS.fontWeight
    };
  }, [textBox.fontSize]);

  const paddingX = useMemo(() => {
    return UNPROJECTED_TILE_SIZE * TEXTBOX_DEFAULTS.paddingX;
  }, []);

  return { paddingX, fontProps };
};
