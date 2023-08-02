import { useRef, useCallback } from 'react';
import { Group, Path, Point } from 'paper';
import { useTheme } from '@mui/material';
import { PROJECTED_TILE_DIMENSIONS } from 'src/config';

export const useLabelConnector = () => {
  const theme = useTheme();
  const containerRef = useRef(new Group());
  const pathRef = useRef<paper.Path.Line>();

  const updateHeight = useCallback((labelHeight: number) => {
    if (!pathRef.current) return;

    pathRef.current.segments[1].point.y = -(
      labelHeight +
      PROJECTED_TILE_DIMENSIONS.height * 0.5
    );
  }, []);

  const init = useCallback(() => {
    containerRef.current.removeChildren();

    pathRef.current = new Path.Line({
      strokeColor: theme.palette.grey[800],
      strokeWidth: 2.5,
      dashArray: [0, 6],
      strokeJoin: 'round',
      strokeCap: 'round',
      dashOffset: 4,
      from: new Point(0, 0)
    });

    containerRef.current.addChild(pathRef.current);

    return containerRef.current;
  }, [theme.palette.grey]);

  const destroy = useCallback(() => {
    return containerRef.current.remove();
  }, []);

  return {
    containerRef,
    init,
    updateHeight,
    destroy
  };
};
