import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useDiagramUtils } from 'src/hooks/useDiagramUtils';

export const SizeIndicator = () => {
  const { getDiagramBoundingBox } = useDiagramUtils();
  const diagramBoundingBox = useMemo(() => {
    return getDiagramBoundingBox();
  }, [getDiagramBoundingBox]);

  return (
    <Box
      sx={{
        position: 'absolute',
        width: diagramBoundingBox.width,
        height: diagramBoundingBox.height,
        left: diagramBoundingBox.x,
        top: diagramBoundingBox.y,
        border: '5px solid red'
      }}
    />
  );
};
