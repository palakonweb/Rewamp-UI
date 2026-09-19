import fs from 'node:fs';
import path from 'node:path';

const REPO_RAW_BASE = 'https://raw.githubusercontent.com/palakonweb/Rewamp-UI/main';

const DEFAULT_CONFIG = {
  $schema: `${REPO_RAW_BASE}/registry/schema.json`,
  registryUrl: `${REPO_RAW_BASE}/registry`,
  repoRawUrl: REPO_RAW_BASE,
  aliases: {
    components: 'src/components/ui',
  },
};

export async function runInit(args) {
  const cwd = process.cwd();
  const configPath = path.join(cwd, 'components.json');

  if (fs.existsSync(configPath) && !args.includes('--force')) {
    console.log('components.json already exists. Pass --force to overwrite.');
    return;
  }

  fs.writeFileSync(configPath, `${JSON.stringify(DEFAULT_CONFIG, null, 2)}\n`, 'utf8');
  console.log('+ created components.json');
  console.log('\nNow run: npx rewampui add <component>');
}
