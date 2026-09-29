const fs = require('fs');
const path = require('path');

const root = process.cwd();
const standaloneDir = path.join(root, '.next', 'standalone');
const staticSrc = path.join(root, '.next', 'static');
const staticDest = path.join(standaloneDir, '.next', 'static');
const publicSrc = path.join(root, 'public');
const publicDest = path.join(standaloneDir, 'public');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    return;
  }

  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (!fs.existsSync(path.join(standaloneDir, 'server.js'))) {
  throw new Error('Standalone build not found. Run "npm run build" first.');
}

fs.mkdirSync(path.dirname(staticDest), { recursive: true });
copyDir(staticSrc, staticDest);
copyDir(publicSrc, publicDest);

const standaloneModules = ['sharp', '@img'];
for (const moduleName of standaloneModules) {
  const moduleSrc = path.join(root, 'node_modules', moduleName);
  const moduleDest = path.join(standaloneDir, 'node_modules', moduleName);
  if (fs.existsSync(moduleSrc)) {
    copyDir(moduleSrc, moduleDest);
  }
}

console.log('Standalone bundle prepared.');
