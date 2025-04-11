#!/usr/bin/env node

/**
 * @maquestiaux-devs/multitech-cli
 * A simple CLI tool for project generation
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJson = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf8'));

console.log('🚀 Welcome to MultiTech CLI!');
console.log('Version:', packageJson.version);
console.log('\nThis CLI will help you create projects based on your selected category and technology.');
console.log('More features coming soon! 🎉\n');
