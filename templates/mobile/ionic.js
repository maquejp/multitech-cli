/**
 * Ionic project template
 * This is a dummy script that will be replaced with actual project generation logic
 */

import { execSync } from 'child_process';
import chalk from 'chalk';

export function createIonicProject(projectName) {
    console.log(chalk.magenta('🚀 Creating Ionic project...'));
    console.log(chalk.cyan(`Category: Mobile`));
    console.log(chalk.cyan(`Technology: Ionic`));

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
    const reservedWords = ['ionic', 'angular', 'react', 'vue', 'node', 'npm', 'yarn', 'package', 'module', 'test', 'build', 'dev', 'prod'];

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

    // Create Ionic project
    try {
        console.log(chalk.yellow('📦 Creating new Ionic project...'));
        execSync(`npx @ionic/cli@latest start ${projectName} tabs --type=angular --capacitor --no-interactive --standalone --no-git`, { stdio: 'inherit' });

        // Navigate to project directory
        process.chdir(projectName);

        // Install dependencies
        console.log(chalk.yellow('📦 Installing dependencies...'));
        execSync('npm install', { stdio: 'inherit' });

        console.log(chalk.green(`✅ Ionic project "${projectName}" created successfully!`));
        console.log(chalk.green(`📂 Project location: ${process.cwd()}`));
        console.log(chalk.green(`🚀 To start the development server:`));
        console.log(chalk.green(`   npm start`));
        console.log(chalk.green(`\n📱 To run on specific platforms:`));
        console.log(chalk.green(`   iOS: npm run ios`));
        console.log(chalk.green(`   Android: npm run android`));
        console.log(chalk.green(`   Web: npm run start`));
        console.log(chalk.green(`\n🔧 Additional commands:`));
        console.log(chalk.green(`   Build: npm run build`));
        console.log(chalk.green(`   Test: npm run test`));
        console.log(chalk.green(`   Lint: npm run lint`));

        process.exit(0);
    } catch (error) {
        console.error(chalk.red('❌ Error creating Ionic project:'), error.message);
        process.exit(1);
    }
} 