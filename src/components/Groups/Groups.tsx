import React from 'react';
import { useSceneStore } from 'src/stores/sceneStore';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { DEFAULT_COLOR } from 'src/config';
import { Group } from './Group/Group';

export const Groups = () => {
  const groups = useSceneStore((state) => {
    return state.groups;
  });
  const mode = useUiStateStore((state) => {
    return state.mode;
  });

  return (
    <>
      {groups.map((group) => {
        return (
          <>
            <Group key={group.id} {...group} />
            {mode.type === 'AREA_TOOL' && mode.area && (
              <Group
                from={mode.area.from}
                to={mode.area.to}
                color={DEFAULT_COLOR}
              />
            )}
          </>
        );
      })}
    </>
  );
};
