const fs = require('fs/promises');
const path = require('path');

// This is a convenience script to create a manifest file from a folder of icons.
// It will look for an /icons folder and create a file called index-check.tsx in the folder you specify.
const createManifestFromFolder = async (dirName, categoryName) => {
  const dir = path.join(__dirname, dirName);
  const iconsDir = path.join(dir, 'icons');
  const iconFiles = await fs.readdir(iconsDir).then(res => res.filter((file) => file.endsWith('.svg')));

  const manifestLineItems = iconFiles.reduce((acc, svg) => {
    const id = svg.split('.')[0];
    const varName = id.replace(/(-|&)/g, '');
    const importLine = `import ${varName} from './icons/${svg}';`;
    const entryLine = `
{ 
  id: '${id}', 
  name: '${id}', 
  category, 
  url: ${varName}.toString(), 
  component: createFlatIcon(${varName}) 
}`;

    const newImports = [...acc.imports, importLine];
    const newEntries = [...acc.entries, entryLine];

    return {
      imports: newImports,
      entries: newEntries
    };
  }, {
    imports: [],
    entries: []
  });

  const manifestFileContent = `
import type { IconInput } from 'src/types';
import { createFlatIcon } from '../FlatIcon';
${manifestLineItems.imports.join('\n')}

const category = '${categoryName}';

const ${categoryName}Isopack: IconInput[] = [
  ${manifestLineItems.entries.join(',\n')}
];

export default ${categoryName}Isopack;
`;

  await fs.writeFile(path.join(dir, 'index-check.tsx'), manifestFileContent);
};

createManifestFromFolder('aws', 'AWS');
