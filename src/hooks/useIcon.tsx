import React, { useMemo, useEffect } from 'react';
import { useSceneStore } from 'src/stores/sceneStore';
import { getItemById } from 'src/utils';
import { NodeImageIcon } from 'src/components/SceneLayers/Nodes/Node/IconTypes/NodeImageIcon';
import { NodeComponentIcon } from 'src/components/SceneLayers/Nodes/Node/IconTypes/NodeComponentIcon';

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
  }, [icon.component, icon.url]);

  const iconComponent = useMemo(() => {
    if (icon.component) {
      setHasLoaded(true);
      return <NodeComponentIcon IconComponent={icon.component} />;
    }

    return (
      <NodeImageIcon
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
