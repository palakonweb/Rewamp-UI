import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// When developing inside the RewampUI monorepo the registry lives two levels up.
// A real published install falls back to fetching from components.json's registryUrl.
const LOCAL_REGISTRY_DIR = path.resolve(__dirname, '../../../registry');

export function readConfig(cwd = process.cwd()) {
  const configPath = path.join(cwd, 'components.json');
  if (!fs.existsSync(configPath)) {
    throw new Error(
      'No components.json found in this project. Run `npx rewampui init` first (or copy components.json from the RewampUI repo).'
    );
  }
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

export async function fetchRegistryItem(name, config) {
  const localPath = path.join(LOCAL_REGISTRY_DIR, `${name}.json`);
  if (fs.existsSync(localPath)) {
    return JSON.parse(fs.readFileSync(localPath, 'utf8'));
  }

  const url = `${config.registryUrl.replace(/\/$/, '')}/${name}.json`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Component "${name}" not found in registry (${url})`);
  }
  return res.json();
}

export function listAllRegistryNames() {
  if (!fs.existsSync(LOCAL_REGISTRY_DIR)) return [];
  return fs
    .readdirSync(LOCAL_REGISTRY_DIR)
    .filter((f) => f.endsWith('.json') && f !== 'schema.json')
    .map((f) => f.replace(/\.json$/, ''));
}

/** Resolves a file's raw source, either from local disk (monorepo dev) or over HTTP. */
export async function readSourceFile(source, config) {
  const localPath = path.resolve(LOCAL_REGISTRY_DIR, '..', source);
  if (fs.existsSync(localPath)) {
    return fs.readFileSync(localPath, 'utf8');
  }

  // Outside the monorepo (a real published install) there's no local registry/
  // folder — fall back to fetching the file straight from the public GitHub repo.
  const base = config?.repoRawUrl || config?.registryUrl?.replace(/\/registry\/?$/, '');
  const url = base ? `${base.replace(/\/$/, '')}/${source}` : source;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Could not fetch source file: ${url}`);
  return res.text();
}
