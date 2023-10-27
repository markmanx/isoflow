// This file will be exported as it's own bundle (separate to the main bundle).  This is because the main
// bundle requires `window` to be present and so can't be imported into a Node environment.
export { INITIAL_DATA } from 'src/config';
export { modelSchema } from 'src/validation/model';
export const version = PACKAGE_VERSION;
