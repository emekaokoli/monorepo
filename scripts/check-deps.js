#!/usr/bin/env node
const { execSync } = require('child_process');

// List of dependency files to protect
const protectedFiles = [
  'package.json',
  'pnpm-lock.yaml',
];

// Get current git user info
const userName = execSync('git config user.name', { encoding: 'utf8' }).trim();
const userEmail = execSync('git config user.email', { encoding: 'utf8' }).trim();

// Allowlist
const allowedUsers = ['emekaokoli'];
const allowedEmails = ['emekaokoli00@gmail.com'];

// Get list of staged files
const staged = execSync('git diff --cached --name-only', { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);

const depChanged = staged.some(file => {
  // Root package.json or lockfile
  if (protectedFiles.includes(file)) return true;
  // Any workspace package.json
  if (/^apps\/.+\/package.json$/.test(file)) return true;
  if (/^packages\/.+\/package.json$/.test(file)) return true;
  return false;
});

if (depChanged) {
  if (!allowedUsers.includes(userName) && !allowedEmails.includes(userEmail)) {
    console.error('\n\x1b[31m[Husky] Dependency changes are restricted. Only the repo owner can commit changes to package.json or pnpm-lock.yaml.\x1b[0m\n');
    process.exit(1);
  }
}
