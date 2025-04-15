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
            { src: '.gitignore.example', dest: '.gitignore' },
            { src: 'package.json.example', dest: 'package.json' },
            { src: 'tsconfig.json.example', dest: 'tsconfig.json' },
            { src: 'README.md.example', dest: 'README.md' }
        ];

        templateFiles.forEach(({ src, dest }) => {
            let content = fs.readFileSync(path.join(templatePath, src), 'utf8');
            content = content.replace(/{{projectName}}/g, projectName);
            fs.writeFileSync(path.join(projectPath, dest), content);
        });

        // Install dependencies
        console.log('Installing dependencies...');
        execSync('npm install express', { stdio: 'inherit' });
        execSync('npm install --save-dev typescript @types/express ts-node-dev @types/node', { stdio: 'inherit' });

        console.log('\nExpress.js project created successfully! 🚀');
        console.log('\nNext steps:');
        console.log(`1. cd ${projectName}`);
        console.log('2. npm run dev');

    } catch (error) {
        console.error('Error creating Express.js project:', error);
        process.exit(1);
    }
}
