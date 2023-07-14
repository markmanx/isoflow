import { useCallback } from 'react';
import { clamp } from '../../utils';
import { useAppState } from './useAppState';

const ZOOM_INCREMENT = 0.2;
const MIN_ZOOM = 0.2;
const MAX_ZOOM = 1;

export const useZoom = () => {
  const zoom = useAppState((state) => state.zoom);
  const setZoom = useAppState((state) => state.setZoom);

  const incrementZoom = useCallback(() => {
    const targetZoom = clamp(
      zoom + ZOOM_INCREMENT,
      MIN_ZOOM,
      MAX_ZOOM,
    );
    setZoom(targetZoom);

    return { zoom: targetZoom };
  }, [zoom, setZoom]);

  const decrementZoom = useCallback(() => {
    const targetZoom = clamp(
      zoom - ZOOM_INCREMENT,
      MIN_ZOOM,
      MAX_ZOOM,
    );
    setZoom(targetZoom);

    return { zoom: targetZoom };
  }, [zoom, setZoom]);

  return {
    incrementZoom,
    decrementZoom,
    zoom,
  };
};
