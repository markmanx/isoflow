import React, { useMemo, useEffect } from 'react';
import { useSceneStore } from 'src/stores/sceneStore';
import { getItemById } from 'src/utils';
import { IsometricIcon } from 'src/components/SceneLayers/Nodes/Node/IconTypes/IsometricIcon';
import { NonIsometricIcon } from 'src/components/SceneLayers/Nodes/Node/IconTypes/NonIsometricIcon';

export const useIcon = (id: string) => {
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const icons = useSceneStore((state) => {
    return state.icons;
  });

  const icon = useMemo(() => {
    return getItemById(icons, id).item;
  }, [icons, id]);

  useEffect(() => {
    setHasLoaded(false);
  }, [icon.url]);

  const iconComponent = useMemo(() => {
    if (!icon.isIsometric) {
      setHasLoaded(true);
      return <NonIsometricIcon icon={icon} />;
    }

    return (
      <IsometricIcon
        url={icon.url}
        onImageLoaded={() => {
          setHasLoaded(true);
        }}
      />
    );
  }, [icon]);

  return {
    icon,
    iconComponent,
    hasLoaded
  };
};
