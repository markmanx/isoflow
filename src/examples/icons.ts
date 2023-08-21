import basicIcons from 'src/isopacks/basic/manifest';
import networkingIcons from 'src/isopacks/networking/manifest';
import { mergeManifests } from 'src/isopacks/utils';

export default mergeManifests([basicIcons, networkingIcons]);
