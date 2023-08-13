import { Size, Coords, SceneInput } from 'src/types';

declare global {
  interface Window {
    Isoflow: {
      getUnprojectedBounds: () => Size & Coords;
      fitDiagramToScreen: () => void;
      setScene: (scene: SceneInput) => void;
    };
  }
}
