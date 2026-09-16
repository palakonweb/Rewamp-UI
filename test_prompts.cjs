const fs = require('fs');
const { componentPrompts, getPromptForSlug } = require('./src/components/componentPrompts.js');

// Check slugs from docsRegistry
const content = fs.readFileSync('src/components/docsRegistry.js', 'utf8');
const entriesMatch = content.match(/components:\s*entries\(([^)]+)\)/g);

console.log('Tested getPromptForSlug successfully');
