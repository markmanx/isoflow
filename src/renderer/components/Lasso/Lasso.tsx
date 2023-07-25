import { useEffect } from 'react';
import { Coords } from 'src/utils/Coords';
import { useLasso } from './useLasso';

interface Props {
  startTile: Coords;
  endTile: Coords;
  parentContainer: paper.Group;
}

export const Lasso = ({ startTile, endTile, parentContainer }: Props) => {
  const lasso = useLasso();
  const { init: initLasso, setSelection } = lasso;

  useEffect(() => {
    const container = initLasso();
    parentContainer.addChild(container);

    return () => {
      container.remove();
    };
  }, [initLasso, parentContainer]);

  useEffect(() => {
    setSelection(startTile, endTile);
  }, [setSelection, startTile, endTile]);

  return null;
};
