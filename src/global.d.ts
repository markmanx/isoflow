import { Size, Coords, SceneInput } from 'src/types';

declare global {
  let PACKAGE_VERSION: string;
  let REPOSITORY_URL: string;

  interface Window {
    Isoflow: {
      getUnprojectedBounds: () => Size & Coords;
      fitProjectToScreen: () => void;
      setScene: (scene: SceneInput) => void;
    };
  }
}
