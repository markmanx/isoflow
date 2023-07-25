import { useRef, useCallback } from 'react';
import { Group, Path, Point } from 'paper';
import { useTheme } from '@mui/material';
import {
  PIXEL_UNIT,
  PROJECTED_TILE_DIMENSIONS
} from 'src/renderer/utils/constants';

export const useLabelConnector = () => {
  const theme = useTheme();
  const containerRef = useRef(new Group());
  const pathRef = useRef<paper.Path.Line>();

  const updateHeight = useCallback((labelHeight: number) => {
    if (!pathRef.current) return;

    pathRef.current.segments[1].point.y = -(
      labelHeight +
      PROJECTED_TILE_DIMENSIONS.y * 0.5
    );
  }, []);

  const setVisible = useCallback((state: boolean) => {
    containerRef.current.visible = state;
  }, []);

  const init = useCallback(() => {
    containerRef.current.removeChildren();

    pathRef.current = new Path.Line({
      strokeColor: theme.palette.grey[800],
      strokeWidth: PIXEL_UNIT * 2.5,
      dashArray: [0, PIXEL_UNIT * 6],
      strokeJoin: 'round',
      strokeCap: 'round',
      dashOffset: PIXEL_UNIT * 4,
      from: new Point(0, 0)
    });

    containerRef.current.addChild(pathRef.current);

    return containerRef.current;
  }, [theme.palette.grey]);

  return {
    containerRef,
    init,
    updateHeight,
    setVisible
  };
};
