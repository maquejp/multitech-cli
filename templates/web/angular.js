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

    // Validate project name
    const projectNameRegex = /^[a-z][a-z0-9-]*[a-z0-9]$/;
    const reservedWords = ['angular', 'null', 'undefined', 'true', 'false', 'let', 'const', 'var', 'function', 'class', 'interface', 'enum', 'import', 'export', 'default', 'extends', 'implements', 'public', 'private', 'protected', 'static', 'abstract', 'async', 'await', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'super', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'goto', 'debugger', 'with', 'in', 'of', 'from', 'as', 'type', 'namespace', 'module', 'require', 'yield', 'void', 'any', 'never', 'unknown', 'object', 'symbol', 'bigint', 'number', 'string', 'boolean', 'undefined', 'null'];

    if (!projectNameRegex.test(projectName)) {
        console.error(chalk.red('❌ Invalid project name. Project name should start with a lowercase letter, contain only lowercase letters, numbers, and dashes, and should not end with a dash.'));
        process.exit(1);
    }

    if (reservedWords.includes(projectName.toLowerCase())) {
        console.error(chalk.red(`❌ Invalid project name. '${projectName}' is a reserved word.`));
        process.exit(1);
    }

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

    // Create Angular project with specified parameters
    console.log(chalk.magenta(`Creating Angular project: ${projectName}`));
    try {
        execSync(`ng new ${projectName} --style=css --ssr=false --skip-tests=true --strict=true --defaults`, {
            stdio: 'inherit',
            cwd: process.cwd()
        });
        console.log(chalk.green(`✅ Angular project '${projectName}' created successfully`));
    } catch (error) {
        console.error(chalk.red('❌ Failed to create Angular project:'), chalk.red(error.message));
        process.exit(1);
    }
} 