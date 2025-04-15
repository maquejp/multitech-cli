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

    // Check if Ionic CLI is installed
    try {
        execSync('ionic --version', { stdio: 'ignore' });
        console.log(chalk.green('✅ Ionic CLI is installed'));
    } catch (error) {
        console.log(chalk.yellow('⚠️ Installing Ionic CLI globally...'));
        try {
            execSync('npm install -g @ionic/cli', { stdio: 'inherit' });
            console.log(chalk.green('✅ Ionic CLI installed successfully'));
        } catch (error) {
            console.error(chalk.red('❌ Failed to install Ionic CLI. Please install it manually:'));
            console.error(chalk.red('   npm install -g @ionic/cli'));
            process.exit(1);
        }
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
        execSync(`ionic start ${projectName} sidemenu --type=angular --capacitor --no-git --no-interactive`, { stdio: 'inherit' });

        // Navigate to project directory
        process.chdir(projectName);

        // Install dependencies
        console.log(chalk.yellow('📦 Installing dependencies...'));
        execSync('npm install', { stdio: 'inherit' });

        console.log(chalk.green(`✅ Ionic project "${projectName}" created successfully!`));
        console.log(chalk.green(`📂 Project location: ${process.cwd()}`));
        console.log(chalk.green(`🚀 To start the development server:`));
        console.log(chalk.green(`   ionic serve`));
        console.log(chalk.green(`\n📱 To run on specific platforms:`));
        console.log(chalk.green(`   iOS: ionic capacitor run ios`));
        console.log(chalk.green(`   Android: ionic capacitor run android`));
        console.log(chalk.green(`   Web: ionic serve`));
        console.log(chalk.green(`\n🔧 Additional commands:`));
        console.log(chalk.green(`   Build: ionic build`));
        console.log(chalk.green(`   Test: ionic test`));
        console.log(chalk.green(`   Add platform: ionic capacitor add [ios|android]`));

        process.exit(0);
    } catch (error) {
        console.error(chalk.red('❌ Error creating Ionic project:'), error.message);
        process.exit(1);
    }
} 