/**
 * Astro project template
 * This is a dummy script that will be replaced with actual project generation logic
 */

import { execSync } from 'child_process';
import chalk from 'chalk';

export function createAstroProject(projectName) {
    console.log(chalk.magenta('🚀 Creating Astro project with TypeScript...'));
    console.log(chalk.cyan(`Category: Web`));
    console.log(chalk.cyan(`Technology: Astro`));

    // Check if npm is installed
    try {
        execSync('npm --version', { stdio: 'ignore' });
        console.log(chalk.green('✅ npm is installed'));
    } catch (error) {
        console.error(chalk.red('❌ npm is not installed. Please install Node.js and npm first.'));
        process.exit(1);
    }

    // Validate project name
    const projectNameRegex = /^[a-z][a-z0-9-]*[a-z0-9]$/;
    const reservedWords = ['astro', 'vite', 'node', 'npm', 'yarn', 'package', 'module', 'test', 'build', 'dev', 'prod'];

    if (!projectNameRegex.test(projectName)) {
        console.error(chalk.red('❌ Invalid project name. Project name must:'));
        console.error(chalk.red('   - Start with a lowercase letter'));
        console.error(chalk.red('   - Contain only lowercase letters, numbers, and dashes'));
        console.error(chalk.red('   - Not end with a dash'));
        console.error(chalk.red('   - Not contain spaces or special characters'));
        process.exit(1);
    }

    if (reservedWords.includes(projectName.toLowerCase())) {
        console.error(chalk.red(`❌ Project name cannot be a reserved word: ${projectName}`));
        process.exit(1);
    }

    // Create Astro project
    try {
        console.log(chalk.yellow('📦 Creating new Astro project...'));
        execSync(`npm create astro@latest ${projectName} -- --template minimal --install --typescript strict --git --yes`, { stdio: 'inherit' });

        // Navigate to project directory
        process.chdir(projectName);
        console.log(chalk.yellow('📦 Installing dependencies...'));
        execSync('npm install', { stdio: 'inherit' });

        console.log(chalk.green(`✅ Astro project "${projectName}" created successfully!`));
        console.log(chalk.green(`📂 Project location: ${process.cwd()}`));
        console.log(chalk.green(`🚀 To start development server, run: cd ${projectName} && npm run dev`));

        process.exit(0);
    } catch (error) {
        console.error(chalk.red('❌ Error creating Astro project:'), error.message);
        process.exit(1);
    }
} 