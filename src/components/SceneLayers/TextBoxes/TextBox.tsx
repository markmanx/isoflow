import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { toPx, CoordsUtils } from 'src/utils';
import { TextBox as TextBoxI } from 'src/types';
import { useIsoProjection } from 'src/hooks/useIsoProjection';
import { useTextBoxProps } from 'src/hooks/useTextBoxProps';

interface Props {
  textBox: TextBoxI;
}

export const TextBox = ({ textBox }: Props) => {
  const { paddingX, fontProps } = useTextBoxProps(textBox);

  const to = useMemo(() => {
    return CoordsUtils.add(textBox.tile, {
      x: textBox.size.width,
      y: 0
    });
  }, [textBox.tile, textBox.size.width]);

  const { css } = useIsoProjection({
    from: textBox.tile,
    to,
    orientation: textBox.orientation
  });

  return (
    <Box style={css}>
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
