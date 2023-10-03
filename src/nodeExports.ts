// This file will be exported as it's own bundle (separate to the main bundle).  This is because the main
// bundle requires `window` to be present and so can't be imported into a Node environment.
export { INITIAL_SCENE } from 'src/config';
export { sceneInput } from 'src/validation/scene';
export const version = PACKAGE_VERSION;
