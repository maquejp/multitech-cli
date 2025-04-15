/**
 * API Platform project template
 * Creates a new Symfony API Platform project
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApiPlatformProject(projectName) {
    const projectPath = path.join(process.cwd(), projectName);
    const templatePath = path.join(__dirname, 'templates', 'apiplatform');

    // Check if directory already exists
    if (fs.existsSync(projectPath)) {
        console.error(`Error: Directory ${projectName} already exists`);
        process.exit(1);
    }

    try {
        // Check if Composer is available
        try {
            execSync('composer --version', { stdio: 'ignore' });
        } catch (error) {
            console.error('Error: Composer is not installed or not available in your PATH.');
            console.error('Please install Composer from https://getcomposer.org/download/');
            console.error('After installation, make sure it is available in your PATH.');
            process.exit(1);
        }

        // Create project directory
        fs.mkdirSync(projectPath);
        process.chdir(projectPath);

        console.log('Creating API Platform project with Symfony...');

        // Create a new Symfony project with API Platform
        execSync('composer create-project api-platform/api-platform .', { stdio: 'inherit' });

        // Copy and process template files if they exist
        if (fs.existsSync(templatePath)) {
            console.log('Applying custom templates...');

            const templateFiles = [
                { src: '.env.example', dest: '.env' },
                { src: '.env.example', dest: '.env.example' },
                { src: '.gitignore.example', dest: '.gitignore' },
                { src: 'README.md.example', dest: 'README.md' }
            ];

            templateFiles.forEach(({ src, dest }) => {
                if (fs.existsSync(path.join(templatePath, src))) {
                    let content = fs.readFileSync(path.join(templatePath, src), 'utf8');
                    content = content.replace(/{{projectName}}/g, projectName);
                    fs.writeFileSync(path.join(projectPath, dest), content);
                }
            });
        }

        console.log('\nAPI Platform project created successfully! 🚀');
        console.log('\nNext steps:');
        console.log(`1. cd ${projectName}`);
        console.log('2. Configure your database in .env.local');
        console.log('3. Run migrations: php bin/console doctrine:migrations:migrate');
        console.log('4. Start the server: symfony server:start');
        console.log('5. Access the API documentation at: http://localhost:8000/api');
        process.exit(0); // Exit the CLI after successful project creation

    } catch (error) {
        console.error('Error creating API Platform project:', error);
        process.exit(1);
    }
} 