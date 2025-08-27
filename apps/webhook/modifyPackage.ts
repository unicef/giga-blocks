import * as fs from 'fs';

// Load the existing package.json
const packagePath = 'dist/apps/webhook/package.json';

try {
  // Read the package.json file as a JSON object
  const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  // Modify package.json as needed
  packageData.scripts = {
    ...packageData.scripts,
    start: 'node main.js',
  };

  // Write the updated package.json back to the file
  fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2), 'utf8');

  console.log('package.json updated successfully.');
} catch (err) {
  console.error('Error updating package.json:', err);
}
