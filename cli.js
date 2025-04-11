#!/usr/bin/env node

/**
 * @maquestiaux-devs/multitech-cli
 * A simple CLI tool for project generation
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import chalk from 'chalk';
import figlet from 'figlet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJson = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf8'));

// Generate ASCII art using figlet
const logo = chalk.cyan(figlet.textSync('MultiTech CLI', {
  font: 'Doom',
  horizontalLayout: 'default',
  verticalLayout: 'default'
}));

// Welcome message
console.log(logo);
console.log(chalk.green(`Version: ${chalk.bold(packageJson.version)}  | Author: ${chalk.bold(packageJson.author.name)}`));
console.log(chalk.yellow(`\n${chalk.bold(packageJson.description)}`));
console.log(chalk.magenta('\nMore features coming soon! 🎉\n'));
