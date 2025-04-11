/**
 * Angular project template
 * This is a dummy script that will be replaced with actual project generation logic
 */

import { execSync } from 'child_process';
import chalk from 'chalk';

export function createAngularProject(projectName) {
    console.log(chalk.magenta(`Creating an Angular project named: ${projectName}`));
    console.log(chalk.cyan('Category: Web Development'));
    console.log(chalk.cyan('Technology: Angular'));

    // Check if Angular CLI is installed
    try {
        execSync('which ng', { stdio: 'ignore' });
        const versionOutput = execSync('ng version', { encoding: 'utf8' });
        // Extract version from the output (format: "Angular CLI: X.X.X")
        const versionMatch = versionOutput.match(/Angular CLI: ([\d\.]+)/);
        const version = versionMatch ? versionMatch[1] : 'unknown';
        console.log(chalk.green(`✅ Angular CLI is already installed (version: ${version})`));
    } catch (error) {
        console.log(chalk.yellow('📦 Installing Angular CLI globally...'));
        try {
            execSync('npm install -g @angular/cli', { stdio: 'inherit' });
            console.log(chalk.green('✅ Angular CLI installed successfully'));
        } catch (installError) {
            console.error(chalk.red('❌ Failed to install Angular CLI:'), chalk.red(installError.message));
            process.exit(1);
        }
    }

    // TODO: Implement actual Angular project creation logic
    console.log(chalk.magenta('Project creation coming soon!'));
} 