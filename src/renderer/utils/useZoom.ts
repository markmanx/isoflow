import { useCallback, useMemo } from 'react';
import { clamp } from 'src/utils';

const ZOOM_INCREMENT = 0.2;
const MIN_ZOOM = 0.2;
const MAX_ZOOM = 1;

const roundToOneDecimalPlace = (num: number) => Math.round(num * 10) / 10;

export const useZoom = () => {
  const zoom = useAppState((state) => state.zoom);
  const setZoom = useAppState((state) => state.setZoom);

  const incrementZoom = useCallback(() => {
    const targetZoom = clamp(zoom + ZOOM_INCREMENT, MIN_ZOOM, MAX_ZOOM);
    setZoom(roundToOneDecimalPlace(targetZoom));
  }, [zoom, setZoom]);

  const decrementZoom = useCallback(() => {
    const targetZoom = clamp(zoom - ZOOM_INCREMENT, MIN_ZOOM, MAX_ZOOM);
    setZoom(roundToOneDecimalPlace(targetZoom));
  }, [zoom, setZoom]);

  const canIncrement = useMemo(() => zoom === MAX_ZOOM, [zoom]);

  const canDecrement = useMemo(() => zoom === MIN_ZOOM, [zoom]);

  return {
    incrementZoom,
    decrementZoom,
    canIncrement,
    canDecrement,
    zoom
  };
};
