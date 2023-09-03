import type { IconInput } from 'src/types';

export const createCategoryIcon = (category: string) => {
  return ({ id, name, url, component }: IconInput) => {
    return {
      id,
      name,
      url: url.toString(),
      category,
      component
    };
  };
};

export const mergeIsopacks = (manifests: IconInput[][]) => {
  return manifests.reduce((acc, manifest) => {
    return [...acc, ...manifest];
  }, []);
};
