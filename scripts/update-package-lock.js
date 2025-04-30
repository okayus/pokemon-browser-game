#!/usr/bin/env node

/**
 * This script updates the package-lock.json file to include all dependencies from package.json
 * It's useful when the CI fails due to missing or outdated entries in package-lock.json
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get the root directory of the project
const rootDir = path.resolve(__dirname, '..');

console.log('Updating package-lock.json...');

try {
  // Run npm install to update package-lock.json
  console.log('Running npm install...');
  execSync('npm install', { cwd: rootDir, stdio: 'inherit' });
  
  // Verify that package-lock.json exists
  const packageLockPath = path.join(rootDir, 'package-lock.json');
  if (!fs.existsSync(packageLockPath)) {
    console.error('Error: package-lock.json was not generated');
    process.exit(1);
  }
  
  console.log('package-lock.json has been successfully updated');
  
  // Check for Firebase dependencies in package-lock.json
  const packageLock = require(packageLockPath);
  
  const firebaseDep = packageLock.packages?.['node_modules/firebase']?.version;
  const firebaseAdminDep = packageLock.packages?.['node_modules/firebase-admin']?.version;
  
  console.log('Firebase dependencies in package-lock.json:');
  console.log(`- firebase: ${firebaseDep || 'Not found'}`);
  console.log(`- firebase-admin: ${firebaseAdminDep || 'Not found'}`);
  
  if (!firebaseDep || !firebaseAdminDep) {
    console.warn('Warning: Some Firebase dependencies may be missing from package-lock.json');
  }
  
} catch (error) {
  console.error(`Failed to update package-lock.json: ${error.message}`);
  process.exit(1);
}
