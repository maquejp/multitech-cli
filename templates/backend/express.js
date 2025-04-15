/**
 * Express project template
 * This is a dummy script that will be replaced with actual project generation logic
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createExpressProject(projectName) {
    const projectPath = path.join(process.cwd(), projectName);
    const templatePath = path.join(__dirname, 'templates', 'express');

    // Check if directory already exists
    if (fs.existsSync(projectPath)) {
        console.error(`Error: Directory ${projectName} already exists`);
        process.exit(1);
    }

    try {
        // Create project directory
        fs.mkdirSync(projectPath);
        process.chdir(projectPath);

        // Initialize npm project
        console.log('Initializing npm project...');
        execSync('npm init -y', { stdio: 'inherit' });

        // Install dependencies
        console.log('Installing dependencies...');
        execSync('npm install express cors dotenv', { stdio: 'inherit' });
        execSync('npm install --save-dev typescript @types/node @types/express @types/cors ts-node-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint prettier', { stdio: 'inherit' });

        // Create project structure
        console.log('Creating project structure...');
        const directories = [
            'src',
            'src/routes',
            'src/controllers'
        ];

        directories.forEach(dir => {
            fs.mkdirSync(path.join(projectPath, dir), { recursive: true });
        });

        // Copy and process template files
        const templateFiles = [
            { src: 'src/app.ts', dest: 'src/app.ts' },
            { src: 'src/server.ts', dest: 'src/server.ts' },
            { src: '.env.example', dest: '.env' },
            { src: '.env.example', dest: '.env.example' },
            { src: '.gitignore', dest: '.gitignore' },
            { src: 'package.json', dest: 'package.json' },
            { src: 'tsconfig.json', dest: 'tsconfig.json' },
            { src: 'README.md', dest: 'README.md' }
        ];

        templateFiles.forEach(({ src, dest }) => {
            let content = fs.readFileSync(path.join(templatePath, src), 'utf8');
            content = content.replace(/{{projectName}}/g, projectName);
            fs.writeFileSync(path.join(projectPath, dest), content);
        });

        console.log('\nExpress.js project created successfully! 🚀');
        console.log('\nNext steps:');
        console.log(`1. cd ${projectName}`);
        console.log('2. npm install');
        console.log('3. cp .env.example .env');
        console.log('4. npm run dev');

    } catch (error) {
        console.error('Error creating Express.js project:', error);
        process.exit(1);
    }
}
