import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { CoordsUtils, getTextWidth, toPx } from 'src/utils';
import { TextBox as TextBoxI } from 'src/types';
import { DEFAULT_FONT_FAMILY } from 'src/config';
import { useIsoProjection } from 'src/hooks/useIsoProjection';
import { useTileSize } from 'src/hooks/useTileSize';

interface Props {
  textBox: TextBoxI;
  isSelected?: boolean;
}

export const TextBox = ({ textBox, isSelected }: Props) => {
  const { unprojectedTileSize } = useTileSize();

  const fontProps = useMemo(() => {
    return {
      fontSize: toPx(unprojectedTileSize * textBox.fontSize),
      fontFamily: DEFAULT_FONT_FAMILY,
      fontWeight: 'bold'
    };
  }, [unprojectedTileSize, textBox.fontSize]);

  const paddingX = useMemo(() => {
    return unprojectedTileSize * 0.2;
  }, [unprojectedTileSize]);

  const textWidth = useMemo(() => {
    return getTextWidth(textBox.text, fontProps) + paddingX * 2;
  }, [textBox.text, fontProps, paddingX]);

  const to = useMemo(() => {
    return CoordsUtils.add(textBox.tile, {
      x: Math.ceil(textWidth / unprojectedTileSize),
      y: 0
    });
  }, [textBox.tile, textWidth, unprojectedTileSize]);

  const { css } = useIsoProjection({
    from: textBox.tile,
    to,
    orientation: textBox.orientation
  });

  return (
    <Box sx={css}>
      {isSelected && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 1,
            borderRadius: 2,
            borderStyle: 'dashed'
          }}
        />
      )}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          px: toPx(paddingX)
        }}
      >
        <Typography
          sx={{
            ...fontProps
          }}
        >
          {textBox.text}
        </Typography>
      </Box>
    </Box>
  );
};
