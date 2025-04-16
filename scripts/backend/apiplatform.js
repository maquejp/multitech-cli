/**
 * API Platform project template
 * This script creates an API Platform project using Docker
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function createApiPlatformProject(projectName) {
    console.log(`Creating an API Platform project named: ${projectName}`);
    console.log('Category: Backend Development');
    console.log('Technology: API Platform with Docker');

    // Check if Docker is available
    try {
        execSync('docker --version', { stdio: 'ignore' });
    } catch (error) {
        console.error('Error: Docker is not installed or not available in your PATH.');
        console.error('Please install Docker from https://www.docker.com/get-started');
        console.error('After installation, make sure Docker is available in your PATH.');
        process.exit(1);
    }

    // Check if Docker Compose is available
    try {
        execSync('docker-compose --version', { stdio: 'ignore' });
    } catch (error) {
        console.error('Error: Docker Compose is not installed or not available in your PATH.');
        console.error('Please install Docker Compose from https://docs.docker.com/compose/install/');
        console.error('After installation, make sure Docker Compose is available in your PATH.');
        process.exit(1);
    }

    // Create project directory
    const projectDir = path.resolve(process.cwd(), projectName);
    if (fs.existsSync(projectDir)) {
        console.error(`Error: Directory ${projectName} already exists.`);
        process.exit(1);
    }

    fs.mkdirSync(projectDir, { recursive: true });
    console.log(`Created project directory: ${projectDir}`);

    // Get template directory
    const templateDir = path.join(__dirname, 'templates', 'apiplatform');

    // Create Docker Compose file from template
    const dockerComposeTemplatePath = path.join(templateDir, 'docker-compose.yml.example');
    if (fs.existsSync(dockerComposeTemplatePath)) {
        let dockerComposeContent = fs.readFileSync(dockerComposeTemplatePath, 'utf8');
        dockerComposeContent = dockerComposeContent.replace(/{{projectName}}/g, projectName);
        fs.writeFileSync(path.join(projectDir, 'docker-compose.yml'), dockerComposeContent);
        console.log('Created docker-compose.yml file from template');
    } else {
        console.error('Error: Docker Compose template file not found.');
        process.exit(1);
    }

    // Create Dockerfile from template
    const dockerfileTemplatePath = path.join(templateDir, 'Dockerfile.example');
    if (fs.existsSync(dockerfileTemplatePath)) {
        let dockerfileContent = fs.readFileSync(dockerfileTemplatePath, 'utf8');
        fs.writeFileSync(path.join(projectDir, 'Dockerfile'), dockerfileContent);
        console.log('Created Dockerfile from template');
    } else {
        console.error('Error: Dockerfile template not found.');
        process.exit(1);
    }

    // Create Nginx configuration from template
    const nginxTemplatePath = path.join(templateDir, 'nginx.conf.example');
    if (fs.existsSync(nginxTemplatePath)) {
        let nginxContent = fs.readFileSync(nginxTemplatePath, 'utf8');
        fs.writeFileSync(path.join(projectDir, 'nginx.conf'), nginxContent);
        console.log('Created nginx.conf file from template');
    } else {
        console.error('Error: Nginx configuration template not found.');
        process.exit(1);
    }

    // Create API directory
    fs.mkdirSync(path.join(projectDir, 'api'), { recursive: true });
    console.log('Created API directory');

    // Create README.md from template
    const readmeTemplatePath = path.join(templateDir, 'README.md.example');
    if (fs.existsSync(readmeTemplatePath)) {
        let readmeContent = fs.readFileSync(readmeTemplatePath, 'utf8');
        readmeContent = readmeContent.replace(/{{projectName}}/g, projectName);
        fs.writeFileSync(path.join(projectDir, 'README.md'), readmeContent);
        console.log('Created README.md file from template');
    } else {
        console.error('Error: README template file not found.');
        process.exit(1);
    }

    // Create .gitignore from template
    const gitignoreTemplatePath = path.join(templateDir, '.gitignore.example');
    if (fs.existsSync(gitignoreTemplatePath)) {
        let gitignoreContent = fs.readFileSync(gitignoreTemplatePath, 'utf8');
        fs.writeFileSync(path.join(projectDir, '.gitignore'), gitignoreContent);
        console.log('Created .gitignore file from template');
    } else {
        console.error('Error: .gitignore template file not found.');
        process.exit(1);
    }

    console.log('\nAPI Platform project created successfully!');
    console.log('\nNext steps:');
    console.log(`1. cd ${projectName}`);
    console.log('2. docker-compose up -d');
    console.log('3. Access the API at http://localhost:8000');
    console.log('\nHappy coding!');
} 