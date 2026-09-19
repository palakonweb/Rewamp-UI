#!/usr/bin/env node
import { runAdd } from '../src/commands/add.js';
import { runInit } from '../src/commands/init.js';

const [, , command, ...args] = process.argv;

async function main() {
  if (command === 'init') {
    await runInit(args);
    return;
  }

  if (command === 'add') {
    await runAdd(args);
    return;
  }

  console.log(`rewampui <command>

Commands:
  init                  Create a components.json config in the current project
  add <component...>    Copy one or more component sources + deps into your project
  add --all             Install every component in the registry

Examples:
  npx rewampui init
  npx rewampui add theme-toggle
  npx rewampui add arch-card-carousel theme-toggle
  npx rewampui add --all

  pnpm dlx rewampui add theme-toggle
  bunx rewampui add theme-toggle
  yarn dlx rewampui add theme-toggle`);
  process.exit(command ? 1 : 0);
}

main().catch((err) => {
  console.error(`✖ ${err.message}`);
  // Node's fetch() wraps the real reason (DNS failure, TLS interception,
  // proxy refusal, etc.) in `.cause` and reports only the generic "fetch
  // failed" as the top-level message — surface it so this is debuggable.
  if (err.cause) {
    console.error(`  cause: ${err.cause.message || err.cause}`);
  }
  process.exit(1);
});
