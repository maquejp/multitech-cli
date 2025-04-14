/**
 * React Native project template
 * This is a dummy script that will be replaced with actual project generation logic
 */

import { execSync } from 'child_process';
import chalk from 'chalk';

export function createReactNativeProject(projectName) {
    console.log(chalk.magenta('🚀 Creating React Native project with Expo...'));
    console.log(chalk.cyan(`Category: Mobile`));
    console.log(chalk.cyan(`Technology: React Native (Expo)`));

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
    const reservedWords = ['react', 'native', 'reactnative', 'expo', 'node', 'npm', 'yarn', 'package', 'module', 'test', 'build', 'dev', 'prod'];

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

    // Create React Native project with Expo
    try {
        console.log(chalk.yellow('📦 Creating new React Native project with Expo...'));
        execSync(`npx create-expo-app@latest ${projectName} --template blank-typescript`, { stdio: 'inherit' });

        // Navigate to project directory
        process.chdir(projectName);

        console.log(chalk.green(`✅ React Native project "${projectName}" created successfully with Expo!`));
        console.log(chalk.green(`📂 Project location: ${process.cwd()}`));
        console.log(chalk.green(`🚀 To start the app:`));
        console.log(chalk.green(`   npx expo start`));
        console.log(chalk.green(`\n📱 To run on specific platforms:`));
        console.log(chalk.green(`   iOS: Press 'i' in the terminal or run 'npx expo run:ios'`));
        console.log(chalk.green(`   Android: Press 'a' in the terminal or run 'npx expo run:android'`));
        console.log(chalk.green(`   Web: Press 'w' in the terminal or run 'npx expo run:web'`));
        console.log(chalk.green(`\n📱 To run on a physical device:`));
        console.log(chalk.green(`   1. Install the Expo Go app on your device`));
        console.log(chalk.green(`   2. Scan the QR code that appears in the terminal`));

        process.exit(0);
    } catch (error) {
        console.error(chalk.red('❌ Error creating React Native project:'), error.message);
        process.exit(1);
    }
} 