import fs from 'fs';

export default async function updatePackage (repository,packageVersion, packageName) {
  console.log('Update package json file');
  const repoDir = `./temp/${repository}`;
  // check if package.json exist and read file
  const packageJson = fs.readFileSync(`${repoDir}/package.json`, 'utf8');
  if(!packageJson) {
    console.log('package.json not found');
    process.exit(1);
  }
  const packageJsonObject = JSON.parse(packageJson);
  if(!packageJsonObject.dependencies[packageName]){
  console.log('Package not found');
    process.exit(1);
  }
  packageJsonObject.dependencies[packageName] = packageVersion;
  fs.writeFileSync(`${repoDir}/package.json`, JSON.stringify(packageJsonObject, null, 2));
}
