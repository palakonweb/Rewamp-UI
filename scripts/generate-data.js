// One-time generator for static showcase data.
//
// Why this exists: components like ContributionActivity used to build their
// mock dataset (371 days of heatmap cells, contributor avatars) on every
// mount with Math.random()/pseudoRandom() loops. That's runtime work that
// re-runs on every fresh render for zero benefit, since the data is purely
// decorative demo content. This script produces the same shape of data once
// and writes it to /data/*.json, which components then import directly
// (`import contributions from '../../data/contributions.json'`) — a static
// import a bundler can serialize/tree-shake, with zero computation at
// mount time.
//
// Run with: node scripts/generate-data.js
// Re-run only if you want to reseed the demo data (e.g. change date range).

import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data');

mkdirSync(DATA_DIR, { recursive: true });

// Deterministic pseudo-random helper (kept identical to the original
// runtime generator so the visual output is unchanged).
function pseudoRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateContributions(totalDays = 371) {
  const data = [];
  const now = new Date(2026, 8, 15); // Sept 15, 2026 — matches the original component's reference date
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - totalDays);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let i = 0; i < totalDays; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);

    const rand = pseudoRandom(i * 13 + 7);
    let count = 0;
    let level = 0;

    if (rand > 0.88) {
      count = Math.floor(pseudoRandom(i * 17) * 8) + 9; // 9-16
      level = 4;
    } else if (rand > 0.72) {
      count = Math.floor(pseudoRandom(i * 19) * 5) + 5; // 5-8
      level = 3;
    } else if (rand > 0.52) {
      count = Math.floor(pseudoRandom(i * 23) * 3) + 2; // 2-4
      level = 2;
    } else if (rand > 0.32) {
      count = 1;
      level = 1;
    }

    data.push({
      // ISO date string — JSON has no Date type, components rehydrate a
      // Date from this once via `new Date(entry.date)` if they need one.
      date: d.toISOString().slice(0, 10),
      label: `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`,
      count,
      level,
    });
  }

  return data;
}

const ACTIVE_MEMBERS = [
  { id: 1, name: 'Elena Rostova', role: 'Design Lead', color: 'from-fuchsia-500 to-violet-600', initials: 'ER' },
  { id: 2, name: 'Marcus Vance', role: 'Frontend Core', color: 'from-violet-500 to-indigo-600', initials: 'MV' },
  { id: 3, name: 'Sora Tanaka', role: 'Creative Dev', color: 'from-purple-500 to-pink-600', initials: 'ST' },
  { id: 4, name: 'Liam Chen', role: 'Motion Engineer', color: 'from-indigo-500 to-purple-600', initials: 'LC' },
  { id: 5, name: 'Amara Diallo', role: 'UI Architect', color: 'from-violet-600 to-fuchsia-600', initials: 'AD' },
  { id: 6, name: 'Oliver Quinn', role: 'Shader Specialist', color: 'from-pink-500 to-rose-600', initials: 'OQ' },
];

writeFileSync(
  join(DATA_DIR, 'contributions.json'),
  JSON.stringify(generateContributions(371), null, 2) + '\n'
);

writeFileSync(
  join(DATA_DIR, 'activity.json'),
  JSON.stringify(ACTIVE_MEMBERS, null, 2) + '\n'
);

console.log('Wrote data/contributions.json (371 entries) and data/activity.json (6 entries)');
