// import { useRef, useCallback, useState } from 'react';
// import { Group, Raster, Point } from 'paper';
// import { useSceneStore } from 'src/stores/useSceneStore';
// import { PROJECTED_TILE_DIMENSIONS } from '../../utils/constants';

// const NODE_IMG_PADDING = 0;

// export const useNodeIcon = () => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const container = useRef(new Group());
//   const icons = useSceneStore((state) => {
//     return state.icons;
//   });

//   const update = useCallback(
//     async (iconId: string) => {
//       setIsLoaded(false);
//       container.current.removeChildren();

//       const icon = icons.find((_icon) => {
//         return _icon.id === iconId;
//       });

//       if (!icon) return;

//       await new Promise((resolve) => {
//         const iconRaster = new Raster();

//         iconRaster.onLoad = () => {
//           if (!container.current) return;

//           iconRaster.scale(
//             (PROJECTED_TILE_DIMENSIONS.width - NODE_IMG_PADDING) /
//               iconRaster.bounds.width
//           );

//           const raster = iconRaster.rasterize();

//           container.current.addChild(raster);
//           container.current.pivot = iconRaster.bounds.bottomCenter;
//           container.current.position = new Point(
//             0,
//             PROJECTED_TILE_DIMENSIONS.height * 0.5
//           );

//           resolve(null);
//         };

//         iconRaster.source = icon.url;
//         setIsLoaded(true);
//       });
//     },
//     [icons]
//   );

//   const init = useCallback(() => {
//     container.current.removeChildren();
//     container.current = new Group();

//     return container.current;
//   }, []);

//   return {
//     container: container.current,
//     update,
//     init,
//     isLoaded
//   };
// };
