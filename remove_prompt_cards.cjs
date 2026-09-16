const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'ui');
const files = fs.readdirSync(dir);

let modifiedCount = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  if (!fs.statSync(filePath).isFile()) continue;
  if (!file.endsWith('.jsx') && !file.endsWith('.tsx')) continue;

  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('Prompt Setup') && !content.includes('promptContent')) continue;

  // Check if there is a Prompt Setup card block
  if (content.includes('Prompt Setup')) {
    const promptIdx = content.indexOf('Prompt Setup');
    // Find the enclosing card: look backwards for <div className="w-full rounded-2xl
    const cardStart = content.lastIndexOf('<div className="w-full rounded-2xl', promptIdx);
    if (cardStart !== -1) {
      // Find the matching </div> for this card
      // Count nested divs
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

      if (cardEnd !== -1) {
        // Cut out the card
        const before = content.slice(0, cardStart);
        const after = content.slice(cardEnd);
        content = before.trimEnd() + '\n' + after.trimStart();
        modifiedCount++;
      }
    }
  }

  // Also check if there's any other variant of Prompt Setup
  if (content.includes('Prompt Setup')) {
    console.log('File still has Prompt Setup:', file);
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

console.log('Successfully removed Prompt Setup cards from', modifiedCount, 'files.');
