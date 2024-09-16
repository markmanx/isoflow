import { useEffect } from 'react';
import { useUiStateStore } from 'src/stores/uiStateStore';


const useScrollZoom = () => {
  const uiStateActions = useUiStateStore((state) => {
      return state.actions;
  });

  const handleScroll = (e: WheelEvent) => {
    e.preventDefault();
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
  }, []);
};

export default useScrollZoom;