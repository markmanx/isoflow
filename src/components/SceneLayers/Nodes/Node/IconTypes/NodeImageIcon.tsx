import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { useTileSize } from 'src/hooks/useTileSize';
import { useResizeObserver } from 'src/hooks/useResizeObserver';

interface Props {
  url: string;
  onImageLoaded?: () => void;
}

export const NodeImageIcon = ({ url, onImageLoaded }: Props) => {
  const ref = useRef();
  const { projectedTileSize } = useTileSize();
  const { size, observe, disconnect } = useResizeObserver();

  useEffect(() => {
    if (!ref.current) return;

    observe(ref.current);

    return disconnect;
  }, [observe, disconnect]);

  return (
    <Box
      ref={ref}
      component="img"
      onLoad={onImageLoaded}
      src={url}
      sx={{
        position: 'absolute',
        width: projectedTileSize.width * 0.8,
        top: -size.height,
        left: -size.width / 2,
        pointerEvents: 'none'
      }}
    />
  );
};
