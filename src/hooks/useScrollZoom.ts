import { useEffect } from 'react';
import { useUiStateStore } from 'src/stores/uiStateStore';


const useScrollZoom = () => {
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const disableScrollZoom = useUiStateStore((state) => {
    return state.disableScrollZoom;
  });

  const handleScroll = (e: WheelEvent) => {
    if (disableScrollZoom) return;
    if (e.deltaY > 0) {
        uiStateActions.decrementZoom();
      } else {
        uiStateActions.incrementZoom();
      }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [disableScrollZoom]);
};

export default useScrollZoom;