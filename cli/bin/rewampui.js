#!/usr/bin/env node
import { runAdd } from '../src/commands/add.js';

const [, , command, ...args] = process.argv;

async function main() {
  if (command === 'add') {
    await runAdd(args);
    return;
  }

  console.log(`rewampui <command>

Commands:
  add <component...>   Copy one or more component sources + deps into your project
  add --all             Install every component in the registry

Examples:
  npx rewampui add theme-toggle
  npx rewampui add arch-card-carousel theme-toggle
  npx rewampui add --all`);
  process.exit(command ? 1 : 0);
}

main().catch((err) => {
  console.error(`✖ ${err.message}`);
  process.exit(1);
});
