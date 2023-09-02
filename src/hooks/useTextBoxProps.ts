import { useMemo } from 'react';
import { TextBox } from 'src/types';
import { useTileSize } from 'src/hooks/useTileSize';
import { DEFAULT_FONT_FAMILY, TEXTBOX_DEFAULTS } from 'src/config';

export const useTextBoxProps = (textBox: TextBox) => {
  const { unprojectedTileSize } = useTileSize();

  const fontProps = useMemo(() => {
    return {
      fontSize: unprojectedTileSize * textBox.fontSize,
      fontFamily: DEFAULT_FONT_FAMILY,
      fontWeight: TEXTBOX_DEFAULTS.fontWeight
    };
  }, [unprojectedTileSize, textBox.fontSize]);

  const paddingX = useMemo(() => {
    return unprojectedTileSize * TEXTBOX_DEFAULTS.paddingX;
  }, [unprojectedTileSize]);

  return { paddingX, fontProps };
};
