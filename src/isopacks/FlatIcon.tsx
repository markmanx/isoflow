import React from 'react';
import { IconComponent } from 'src/types';
import { getIsoProjectionCss } from 'src/utils';

export const createFlatIcon = (
  icon: React.FunctionComponent
): IconComponent => {
  return ({ projectedTileSize }) => {
    return (
      <div
        style={{
          position: 'absolute',
          left: -projectedTileSize.width / 2,
          top: -projectedTileSize.height / 2,
          transformOrigin: 'top left',
          transform: getIsoProjectionCss(),
          userSelect: 'none'
        }}
      >
        <img
          src={icon.toString()}
          alt="EC2"
          style={{ width: projectedTileSize.width * 0.7 }}
        />
      </div>
    );
  };
};
