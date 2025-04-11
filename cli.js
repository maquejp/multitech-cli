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
import inquirer from 'inquirer';

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
console.log(chalk.magenta('More features coming soon! 🎉\n'));

// Technology options by category
const technologyOptions = {
  web: [
    { name: '⚡ Angular', value: 'angular' },
    { name: '🚀 Astro', value: 'astro' },
    { name: '⚛️ React', value: 'react' },
    { name: '💫 Svelte', value: 'svelte' },
    { name: '🌊 Vue', value: 'vue' }
  ],
  backend: [
    { name: '🔌 API Platform', value: 'apiplatform' },
    { name: '🚂 Express', value: 'express' },
    { name: '☕ Spring Boot', value: 'springboot' }
  ],
  mobile: [
    { name: '📱 Flutter', value: 'flutter' },
    { name: '📲 Ionic', value: 'ionic' },
    { name: '📱 React Native', value: 'reactnative' }
  ],
  database: [
    { name: '🐬 MariaDB', value: 'mariadb' },
    { name: '🍃 MongoDB', value: 'mongodb' },
    { name: '🔷 Oracle', value: 'oracle' },
    { name: '🐘 PostgreSQL', value: 'postgresql' }
  ]
};

// Technology selection function
async function selectTechnology(category) {
  const { technology } = await inquirer.prompt([
    {
      type: 'list',
      name: 'technology',
      message: `Select a ${category} technology:`,
      choices: [
        ...technologyOptions[category],
        { name: '↩️  Back to categories', value: 'back' }
      ]
    }
  ]);

  if (technology === 'back') {
    return null;
  }

  console.log(chalk.cyan(`\nSelected technology: ${chalk.bold(technology)}`));
  // TODO: Implement project creation based on category and technology
  return technology;
}

// Category selection function
async function selectCategory() {
  const { category } = await inquirer.prompt([
    {
      type: 'list',
      name: 'category',
      message: 'Select a project category:',
      choices: [
        { name: '🌐  Web Development', value: 'web' },
        { name: '⚙️  Backend Development', value: 'backend' },
        { name: '📱  Mobile Development', value: 'mobile' },
        { name: '🗄️  Database', value: 'database' },
        { name: '↩️  Back to main menu', value: 'back' }
      ]
    }
  ]);

  if (category === 'back') {
    return null;
  }

  console.log(chalk.cyan(`\nSelected category: ${chalk.bold(category)}`));
  return category;
}

// Main menu function
async function showMainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { name: '🚀  Create a new project', value: 'create' },
        { name: '❓  Help', value: 'help' },
        { name: '👋  Quit', value: 'quit' }
      ]
    }
  ]);

  switch (action) {
    case 'create':
      console.log(chalk.cyan('\nCreating a new project...'));
      const category = await selectCategory();
      if (category) {
        const technology = await selectTechnology(category);
        if (technology) {
          console.log(chalk.yellow('\nProject creation coming soon!'));
        }
      }
      break;
    case 'help':
      console.log(chalk.cyan('\nHelp Information:'));
      console.log(chalk.yellow('This CLI tool helps you create new projects with various technologies.'));
      console.log(chalk.yellow('Select "Create a new project" to start building your next project!'));
      break;
    case 'quit':
      console.log(chalk.green('\nThank you for using MultiTech CLI! Goodbye! 👋\n'));
      process.exit(0);
  }

  // Return to main menu unless quitting
  if (action !== 'quit') {
    console.log('\n');
    await showMainMenu();
  }
}

// Start the CLI
showMainMenu().catch(error => {
  console.error(chalk.red('An error occurred:'), error);
  process.exit(1);
});
