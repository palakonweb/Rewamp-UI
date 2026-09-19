import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import {
  readConfig,
  fetchRegistryItem,
  readSourceFile,
  listAllRegistryNames,
} from '../utils/registry.js';
import { detectPackageManager, installArgs, installCommand } from '../utils/package-manager.js';

export async function runAdd(args) {
  if (args.length === 0) {
    throw new Error('Usage: rewampui add <component...> | rewampui add --all');
  }

  const cwd = process.cwd();
  const config = readConfig(cwd);
  const componentsDir = path.resolve(cwd, config.aliases?.components || 'src/components/ui');

  const names = args.includes('--all') ? listAllRegistryNames() : args;
  if (names.length === 0) {
    throw new Error('No components found in the registry.');
  }

  const resolved = new Map(); // name -> registry item
  const queue = [...names];
  while (queue.length) {
    const name = queue.shift();
    if (resolved.has(name)) continue;
    const item = await fetchRegistryItem(name, config);
    resolved.set(name, item);
    for (const dep of item.registryDependencies || []) {
      if (!resolved.has(dep)) queue.push(dep);
    }
  }

  const npmDeps = new Set();
  fs.mkdirSync(componentsDir, { recursive: true });

  for (const [name, item] of resolved) {
    for (const dep of item.npmDependencies || []) npmDeps.add(dep);

    for (const file of item.files) {
      const targetPath = path.join(componentsDir, file.target);
      const wasExplicitlyRequested = names.includes(name) || names.includes('--all');
      if (fs.existsSync(targetPath) && !wasExplicitlyRequested) {
        console.log(`- skip  ${file.target} (already exists)`);
        continue;
      }
      const source = await readSourceFile(file.source, config);
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.writeFileSync(targetPath, source, 'utf8');
      console.log(`+ added ${file.target}`);
    }
  }

  if (npmDeps.size > 0) {
    const pm = detectPackageManager(cwd);
    const deps = [...npmDeps];
    console.log(`\nInstalling dependencies with ${pm}: ${installCommand(pm, deps)}`);
    const result = spawnSync(pm, installArgs(pm, deps), { cwd, stdio: 'inherit', shell: true });
    if (result.status !== 0) {
      throw new Error(`Failed to install dependencies. Run manually: ${installCommand(pm, deps)}`);
    }
  }

  console.log(`\nDone. Added: ${[...resolved.keys()].join(', ')}`);
}
