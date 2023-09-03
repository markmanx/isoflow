import type { IconInput } from 'src/types';

type CreateIconArgs = Omit<IconInput, 'url'> & {
  url: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
};

export const createCategoryIcon = (category: string) => {
  return ({ id, name, url, component }: CreateIconArgs) => {
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
