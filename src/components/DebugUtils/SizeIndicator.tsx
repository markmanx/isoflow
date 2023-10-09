import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useDiagramUtils } from 'src/hooks/useDiagramUtils';

export const SizeIndicator = () => {
  const { getUnprojectedBounds } = useDiagramUtils();
  const diagramBoundingBox = useMemo(() => {
    return getUnprojectedBounds();
  }, [getUnprojectedBounds]);

  return (
    <Box
      sx={{
        position: 'absolute',
        border: '5px solid red'
      }}
      style={{
        width: diagramBoundingBox.width,
        height: diagramBoundingBox.height,
        left: diagramBoundingBox.x,
        top: diagramBoundingBox.y
      }}
    />
  );
};
