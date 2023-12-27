import * as fs from 'fs';

// Load the existing package.json
const packagePath = 'dist/apps/api/package.json';

try {
  // Read the package.json file as a JSON object
  const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  // Modify package.json as needed
  packageData.scripts = {
    ...packageData.scripts,
    start: 'node main.js',
    school: 'ts-node prisma/schoolSeed.ts',
    csvRead: 'ts-node prisma/csvReader.ts',
    'studio:app': 'prisma studio --schema prisma/application/schema.prisma',
    'studio:news': 'prisma studio --schema prisma/newsletter/schema.prisma',
    'app:migrate': 'prisma migrate dev --schema prisma/application/schema.prisma',
    'news:migrate': 'prisma migrate dev --schema prisma/newsletter/schema.prisma',
    'app:generate': 'prisma generate --schema prisma/application/schema.prisma',
    'news:generate': 'prisma generate --schema prisma/newsletter/schema.prisma',
  };

  packageData.dependencies = {
    ...packageData.dependencies,
    'prisma-dbml-generator': '^0.10.0',
    'prisma-docs-generator': '^0.8.0',
    prisma: '^5.1.0',
    'ts-node': '^10.9.1',
    '@prisma/client': '^5.1.0',
  };

  packageData.prisma = {
    seed: 'prisma/seed.ts',
  };

  // Write the updated package.json back to the file
  fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2), 'utf8');

  console.log('package.json updated successfully.');
} catch (err) {
  console.error('Error updating package.json:', err);
}
