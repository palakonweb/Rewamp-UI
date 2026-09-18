// One-off generator: reads docsRegistry.js's makeLazy(...) calls and emits a
// registry/<slug>.json manifest for every component, resolving the real
// implementation file (not the *Showcase wrapper) and its npm dependencies.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const UI_DIR = path.join(ROOT, 'src/components/ui');
const REGISTRY_DIR = path.join(ROOT, 'registry');
const DOCS_REGISTRY = path.join(ROOT, 'src/components/docsRegistry.js');

const SHARED_FILE_TO_SLUG = {
  Skeleton: 'skeleton',
  ErrorBoundary: 'error-boundary',
  CanvasShimmerSkeleton: 'canvas-shimmer-skeleton',
};

const EXTS = ['.tsx', '.jsx', '.ts', '.js'];

function findFile(baseName) {
  for (const ext of EXTS) {
    const p = path.join(UI_DIR, `${baseName}${ext}`);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function extractDependencies(source) {
  const deps = new Set();
  const registryDeps = new Set();
  const importRegex = /(?:^|\n)\s*import[^'"]*from\s+['"]([^'"]+)['"]/g;
  let m;
  while ((m = importRegex.exec(source)) !== null) {
    const spec = m[1];
    if (spec.startsWith('.')) {
      const base = path.basename(spec).replace(/\.(tsx|jsx|ts|js)$/, '');
      if (SHARED_FILE_TO_SLUG[base]) registryDeps.add(SHARED_FILE_TO_SLUG[base]);
      continue;
    }
    if (spec === 'react' || spec === 'react-dom') continue;
    const root = spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0];
    deps.add(root);
  }
  return { npmDependencies: [...deps], registryDependencies: [...registryDeps] };
}

function parseMakeLazyCalls(text) {
  const calls = [];
  // Track the enclosing category's `id: '...'` as we scan top-to-bottom.
  const lineRegex = /id:\s*'([^']+)'|makeLazy\(\s*'((?:[^'\\]|\\.)*)'\s*,\s*'((?:[^'\\]|\\.)*)'\s*,\s*\(\)\s*=>\s*import\(['"]\.\/ui\/([^'"]+)['"]\)\s*,\s*'([^']+)'\s*\)/g;
  let m;
  let currentCategory = 'components';
  while ((m = lineRegex.exec(text)) !== null) {
    if (m[1]) {
      currentCategory = m[1];
      continue;
    }
    calls.push({ title: m[2], slug: m[3], importPath: m[4], fileName: m[5], category: currentCategory });
  }
  return calls;
}

function main() {
  const text = fs.readFileSync(DOCS_REGISTRY, 'utf8');
  const calls = parseMakeLazyCalls(text);
  console.log(`Found ${calls.length} components in docsRegistry.js`);

  fs.mkdirSync(REGISTRY_DIR, { recursive: true });

  const results = { written: [], skipped: [] };

  for (const { slug, fileName, category } of calls) {
    const baseName = fileName.replace(/Showcase$/, '');
    let sourceFile = baseName !== fileName ? findFile(baseName) : null;
    let isSelfContained = false;
    if (!sourceFile) {
      sourceFile = findFile(fileName);
      isSelfContained = true;
    }

    if (!sourceFile) {
      results.skipped.push({ slug, reason: 'no source file found', fileName });
      continue;
    }

    const source = fs.readFileSync(sourceFile, 'utf8');
    const { npmDependencies, registryDependencies } = extractDependencies(source);
    const ext = path.extname(sourceFile);
    const targetName = path.basename(sourceFile);

    const manifest = {
      name: slug,
      category,
      npmDependencies,
      registryDependencies,
      files: [
        {
          source: `src/components/ui/${targetName}`,
          target: targetName,
        },
      ],
    };

    const outPath = path.join(REGISTRY_DIR, `${slug}.json`);
    fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
    results.written.push({ slug, targetName, isSelfContained, npmDependencies });
  }

  console.log(`\nWritten: ${results.written.length}`);
  console.log(`Skipped: ${results.skipped.length}`);
  if (results.skipped.length) {
    console.log(JSON.stringify(results.skipped, null, 2));
  }
}

main();
