import React from 'react';
import { getCSSMatrix } from 'src/renderer/utils/projection';
import { getProjectedTileSize } from 'src/renderer/utils/constants';

interface Props {
  tile: { x: number; y: number };
  tileSize: number;
}

export const Cursor = ({ tile, tileSize }: Props) => {
  const projectedTileSize = getProjectedTileSize(tileSize);
  const position = tile;

  // return (
  //   <svg
  //     style={{
  //       position: 'absolute',
  //       left: position.x,
  //       top: position.y
  //     }}
  //     width={tileSize}
  //     height={tileSize}
  //     transform={`translate(
  //       ${-tileSize * 0.5}, ${-tileSize * 0.5})`}
  //   >
  //     <rect width={tileSize} height={tileSize} fill="red" />
  //   </svg>
  // );

  return (
    <svg
      style={{
        position: 'absolute',
        left: `calc(50% - ${tileSize * 0.5}px)`,
        top: `calc(50% - ${tileSize * 0.5}px)`
      }}
      width={tileSize}
      height={tileSize}
      transform={`${getCSSMatrix()}`}
    >
      <rect width={tileSize} height={tileSize} fill="red" />
    </svg>
  );
};
