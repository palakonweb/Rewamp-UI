const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'ui');
const files = fs.readdirSync(dir);

let removed = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  if (!fs.statSync(filePath).isFile()) continue;
  if (!file.endsWith('.jsx') && !file.endsWith('.tsx')) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // Find any code block displaying {promptContent}
  while (content.includes('{promptContent}')) {
    const idx = content.indexOf('{promptContent}');
    // Look backwards for the start of the prompt card div
    // It's usually <div className="w-full rounded-2xl or <div className="mt-8 or <div className="w-full
    let cardStart = -1;
    const candidates = [
      '<div className="w-full rounded-2xl',
      '<div className="w-full rounded-xl',
      '<div className="w-full p-4',
      '<div className="w-full mt-',
      '<div className="mt-8',
      '<div className="mt-6',
      '<div className="mt-12',
      '<div className="p-4 rounded-xl',
      '<div className="p-5 rounded-2xl',
      '<div className="rounded-2xl',
    ];

    for (const cand of candidates) {
      const found = content.lastIndexOf(cand, idx);
      if (found !== -1 && (cardStart === -1 || found > cardStart)) {
        cardStart = found;
      }
    }

    if (cardStart === -1) {
      // Fallback: look for the last <div before idx that has class containing rounded
      let searchPos = idx;
      while (searchPos > 0) {
        const d = content.lastIndexOf('<div', searchPos);
        if (d === -1) break;
        const tagEnd = content.indexOf('>', d);
        const tag = content.slice(d, tagEnd + 1);
        if (tag.includes('rounded') || tag.includes('border')) {
          cardStart = d;
          break;
        }
        searchPos = d - 1;
      }
    }

    if (cardStart === -1) break;

    // Find the matching </div>
    let depth = 0;
    let cardEnd = -1;
    let i = cardStart;
    while (i < content.length) {
      if (content.startsWith('<div', i)) {
        depth++;
        i += 4;
      } else if (content.startsWith('</div>', i)) {
        depth--;
        i += 6;
        if (depth === 0) {
          cardEnd = i;
          break;
        }
      } else {
        i++;
      }
    }

    if (cardEnd !== -1 && cardEnd > idx) {
      const before = content.slice(0, cardStart);
      const after = content.slice(cardEnd);
      content = before.trimEnd() + '\n' + after.trimStart();
      removed++;
    } else {
      break;
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

console.log('Removed', removed, 'additional prompt cards from UI files.');
