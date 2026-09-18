import fs from 'node:fs';
import path from 'node:path';

const LOCKFILES = [
  { file: 'bun.lockb', pm: 'bun' },
  { file: 'pnpm-lock.yaml', pm: 'pnpm' },
  { file: 'yarn.lock', pm: 'yarn' },
  { file: 'package-lock.json', pm: 'npm' },
];

/** Walks up from cwd looking for a lockfile to infer the project's package manager. */
export function detectPackageManager(cwd = process.cwd()) {
  let dir = cwd;
  while (true) {
    for (const { file, pm } of LOCKFILES) {
      if (fs.existsSync(path.join(dir, file))) return pm;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return 'npm';
}

export function installCommand(pm, packages) {
  const list = packages.join(' ');
  switch (pm) {
    case 'pnpm':
      return `pnpm add ${list}`;
    case 'yarn':
      return `yarn add ${list}`;
    case 'bun':
      return `bun add ${list}`;
    default:
      return `npm install ${list}`;
  }
}

export function installArgs(pm, packages) {
  switch (pm) {
    case 'pnpm':
      return ['add', ...packages];
    case 'yarn':
      return ['add', ...packages];
    case 'bun':
      return ['add', ...packages];
    default:
      return ['install', ...packages];
  }
}
