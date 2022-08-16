import fs from 'fs';

const updatePackage = async (path, packageVersion, packageName) => {
  const packageJson = fs.readFileSync(path, 'utf8');
  let dirty = false;
  if (!packageJson) {
    console.log('\x1b[33m%s\x1b[0m', 'No package.json found');
    return false;
  }
  let packageJsonObject;
  try {
    packageJsonObject = JSON.parse(packageJson);
  } catch (e) {
    console.log('\x1b[33m%s\x1b[0m', 'wrong package.json format ' + e.message);
    return false;
  }
  if (packageJsonObject.dependencies && packageJsonObject.dependencies[packageName]) {
    packageJsonObject.dependencies[packageName] = packageVersion;
    dirty = true;
  } else {
    console.log(`${packageName} not found in dependencies ${path}`);
  }
  if (packageJsonObject.devDependencies && !packageJsonObject.devDependencies[packageName]) {
    packageJsonObject.devDependencies[packageName] = packageVersion;
    dirty = true;
  } else {
    console.log(`${packageName} not found in devDependencies ${path}`);
  }
  if (dirty) {
    console.log(`update ${packageName} to ${packageVersion} in ${path}`);
    fs.writeFileSync(path, JSON.stringify(packageJsonObject, null, 2));
    return true;
  }
};

const findPackageJsonFiles = repoDir => {
  const files = fs.readdirSync(repoDir);
  const packageJsonFiles = [];
  for (const file of files) {
    const filePath = `${repoDir}/${file}`;
    if (fs.lstatSync(filePath).isDirectory()) {
      packageJsonFiles.push(...findPackageJsonFiles(filePath));
    } else if (file === 'package.json') {
      packageJsonFiles.push(filePath);
    }
  }
  return packageJsonFiles;
};

export default async function updateFiles (repository, packageVersion, packageName) {
  const repoDir = `./temp/${repository}`;
  const packageJsonLocations = findPackageJsonFiles(repoDir);
  const updatedFiles = [];
  for (const packageJsonLocation of packageJsonLocations) {
    if (await updatePackage(packageJsonLocation, packageVersion, packageName)) {
      // collect updated files relative path for git commit
      updatedFiles.push(packageJsonLocation.replace(repoDir + '/', ''));
    }
  }
  return updatedFiles;
}
