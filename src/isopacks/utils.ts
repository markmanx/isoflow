import type { IconInput } from 'src/types';

export const mergeIsopacks = (manifests: IconInput[][]) => {
  return manifests.reduce((acc, manifest) => {
    return [...acc, ...manifest];
  }, []);
};
