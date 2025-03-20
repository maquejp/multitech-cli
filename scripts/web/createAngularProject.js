import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function initializeProject(name) {
    console.log('Creating new Angular project...');
    execSync(
        `ng new ${name} --style=css --ssr=false  --skip-tests --package-manager bun`,
        {
            stdio: 'inherit',
        }
    );
    return path.join(process.cwd(), name);
}

function setupTailwindCSS(projectPath) {
    console.log('Setting up TailwindCSS...');
    execSync('npm install -D tailwindcss postcss autoprefixer', {
        cwd: projectPath,
        stdio: 'inherit',
    });
    execSync('bun add --silent tailwindcss @tailwindcss/postcss postcss', { cwd: projectPath, stdio: 'inherit' });

    // Create PostCSS config
    const postcssPath = path.join(projectPath, '.postcssrc.json');
    const postcssConfig = `{  "plugins": {    "@tailwindcss/postcss": {}  }}`;
    fs.writeFileSync(postcssPath, postcssConfig, "utf-8");

    // Update styles.css
    const stylesPath = path.join(projectPath, 'src/styles.css');
    const stylesContent = `@import "tailwindcss"\n`;
    fs.writeFileSync(stylesPath, stylesContent, "utf-8");
}

function createFolderStructure(projectPath) {
    const folderStructure = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'angularFolderStructure.json'), 'utf-8')
    );

    folderStructure.folders.forEach((folder) => {
        const folderPath = path.join(projectPath, folder.path);
        fs.mkdirSync(folderPath, { recursive: true });
        fs.writeFileSync(path.join(folderPath, 'README.md'), folder.description);
    });
}

function updateAppComponent(projectPath, projectName, creationDate) {
    // Update app.component.ts
    const appComponentPath = path.join(projectPath, 'src/app/app.component.ts');
    const appComponentContent = `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  creationDate = "${creationDate}";
}`;
    fs.writeFileSync(appComponentPath, appComponentContent);

    // Update app.component.html
    const appComponentHtmlPath = path.join(projectPath, 'src/app/app.component.html');
    const appComponentHtmlContent = `<div class="min-h-screen bg-gray-100 flex items-center justify-center">
  <div class="text-center">
    <h1 class="text-4xl font-bold text-gray-800 mb-4">Welcome to ${projectName}</h1>
    <p class="text-gray-600">Created on: {{ creationDate }}</p>
  </div>
</div>`;
    fs.writeFileSync(appComponentHtmlPath, appComponentHtmlContent);

    // Empty app.component.css
    const appComponentCssPath = path.join(projectPath, 'src/app/app.component.css');
    fs.writeFileSync(appComponentCssPath, '');
}

function displayNextSteps(projectName) {
    console.log('\nAngular project created successfully! 🎉');
    console.log(`\nNext steps:
1. cd ${projectName}
2. ng serve`);
}

export default async function createAngularProject({ projectName }) {
    try {
        // Get creation date
        const creationDate = new Date().toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h23'
        }).replace(',', '');

        // 1. Initialize the project
        const projectPath = initializeProject(projectName);

        // 2. Setup TailwindCSS
        setupTailwindCSS(projectPath);

        // 3. Create recommended folder structure
        createFolderStructure(projectPath);

        // 4. Update app.component.ts with minimal implementation
        updateAppComponent(projectPath, projectName, creationDate);

        // 5. Display next steps
        displayNextSteps(projectName);
    } catch (error) {
        console.error('Error creating Angular project:', error);
        process.exit(1);
    }
}

// If running directly (not imported as a module)
if (require.main === module) {
    const projectName = process.argv[2];
    if (!projectName) {
        console.error('Please provide a project name');
        process.exit(1);
    }
    createAngularProject({ projectName });
}