const fs = require('fs');

// Load the existing package.json
const packagePath = 'dist/apps/api/package.json';

try {
  // Read the package.json file as a JSON object
  const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  // Modify package.json as needed
  packageData.scripts = {
    ...packageData.scripts,
    migrate: 'prisma migrate dev',
    generate: 'prisma generate',
    studio: 'prisma studio',
    start: 'node main.js',
  };

  packageData.dependencies = {
    ...packageData.dependencies,
    'prisma-dbml-generator': '^0.10.0',
    'prisma-docs-generator': '^0.8.0',
  };

  packageData.prisma = {
    schema: 'prisma/schema.prisma',
    seed: 'prisma/seed.ts',
  };

  // Write the updated package.json back to the file
  fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2), 'utf8');

  console.log('package.json updated successfully.');
} catch (err) {
  console.error('Error updating package.json:', err);
}
