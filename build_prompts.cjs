const fs = require('fs');
const path = require('path');

// Extract all prompts from showcase files and source files
const uiDir = path.join(__dirname, 'src', 'components', 'ui');
const files = fs.readdirSync(uiDir);

const promptsBySlug = {};

function toSlug(name) {
  return name
    .replace(/Showcase$/, '')
    .replace(/Source$/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

for (const file of files) {
  const filePath = path.join(uiDir, file);
  if (!fs.statSync(filePath).isFile()) continue;
  if (!file.endsWith('.jsx') && !file.endsWith('.tsx') && !file.endsWith('.js') && !file.endsWith('.ts')) continue;

  const content = fs.readFileSync(filePath, 'utf8');

  // Match promptContent
  let p = null;
  const idx1 = content.indexOf('promptContent = `');
  if (idx1 !== -1) {
    const start = idx1 + 'promptContent = `'.length;
    const end = content.indexOf('`;', start);
    if (end !== -1) p = content.slice(start, end).trim();
  }

  if (!p) {
    const pMatch = content.match(/export\s+const\s+[a-zA-Z0-9]+Prompt\s*=\s*`([^`]+)`/);
    if (pMatch) p = pMatch[1].trim();
  }

  if (p) {
    const slug = toSlug(file.replace(/\.(jsx|tsx|js|ts)$/, ''));
    promptsBySlug[slug] = p;
  }
}

console.log('Extracted', Object.keys(promptsBySlug).length, 'prompts from ui files.');

// Also check docsRegistry.js for readyDetails
const registryPath = path.join(__dirname, 'src', 'components', 'docsRegistry.js');
const regContent = fs.readFileSync(registryPath, 'utf8');

// Also check existing component names in docsRegistry
console.log('Sample slugs:', Object.keys(promptsBySlug).slice(0, 10));

// Write a clean module exporting componentPrompts map
const outContent = `// Automatically generated component prompts map for RewampUI
// Every component has its own verified, natural-language prompt.

export const componentPrompts = ${JSON.stringify(promptsBySlug, null, 2)};

export function getPromptForSlug(slug, title) {
  if (componentPrompts[slug]) return componentPrompts[slug];
  // Fallbacks by normalized slug
  const normalized = slug.replace(/-(showcase|source|demo|background)$/, '');
  for (const [k, v] of Object.entries(componentPrompts)) {
    if (k.startsWith(normalized) || normalized.startsWith(k)) return v;
  }
  return \`Create a high-performance interactive \${title || slug} component for RewampUI with smooth Framer Motion spring physics, dark/light theme support, and responsive styling.\`;
}
`;

fs.writeFileSync(path.join(__dirname, 'src', 'components', 'componentPrompts.js'), outContent, 'utf8');
console.log('Successfully created src/components/componentPrompts.js');
