/**
 * Express project template
 * This is a dummy script that will be replaced with actual project generation logic
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function createExpressProject(projectName) {
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
        execSync('npm install --save-dev nodemon', { stdio: 'inherit' });

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
            { src: 'src/app.js', dest: 'src/app.js' },
            { src: 'src/server.js', dest: 'src/server.js' },
            { src: '.env', dest: '.env' },
            { src: '.env.example', dest: '.env.example' },
            { src: '.gitignore', dest: '.gitignore' },
            { src: 'package.json', dest: 'package.json' },
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

module.exports = createExpressProject; 