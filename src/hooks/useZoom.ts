import { useCallback } from "react";
import { clamp } from "../utils";
import { useGlobalState } from "../hooks/useGlobalState";

const ZOOM_INCREMENT = 0.2;
const MIN_ZOOM = 0.2;
const MAX_ZOOM = 1;

export const useZoom = () => {
  const renderer = useGlobalState((state) => state.renderer);

  const incrementZoom = useCallback(() => {
    const targetZoom = clamp(
      renderer.zoom + ZOOM_INCREMENT,
      MIN_ZOOM,
      MAX_ZOOM
    );
    renderer.setZoom(targetZoom);

    return { zoom: targetZoom };
  }, [renderer]);

  const decrementZoom = useCallback(() => {
    const targetZoom = clamp(
      renderer.zoom - ZOOM_INCREMENT,
      MIN_ZOOM,
      MAX_ZOOM
    );
    renderer.setZoom(targetZoom);

    return { zoom: targetZoom };
  }, [renderer]);

  return {
    incrementZoom,
    decrementZoom,
  };
};
