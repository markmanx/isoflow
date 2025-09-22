import { useUiStateStore } from 'src/stores/uiStateStore';

export const useNodeIndicatorComponent = () => {
  const model = useUiStateStore((state) => {
    return state;
  });

  const nodeIndicatorComponent = model.nodeIndicatorComponent;

  return nodeIndicatorComponent;
};
