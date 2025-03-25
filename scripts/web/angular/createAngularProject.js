import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { welcomePageContent } from '../shared/welcomePage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function initializeProject(name) {
    console.log('Creating new Angular project...');
    execSync(
        `ng new ${name} --style=css --routing=true --skip-tests=true --strict=true --ssr=false --package-manager bun`,
        {
            stdio: 'inherit',
        }
    );
    return path.join(process.cwd(), name);
}

function setupTailwindCSS(projectPath) {
    console.log('Setting up TailwindCSS...');
    execSync('bun add -D tailwindcss postcss autoprefixer', {
        cwd: projectPath,
        stdio: 'inherit',
    });

    // Configure TailwindCSS
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
    fs.writeFileSync(path.join(projectPath, 'tailwind.config.js'), tailwindConfig);

    // Create postcss.config.js
    const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;
    fs.writeFileSync(path.join(projectPath, 'postcss.config.js'), postcssConfig);

    // Update styles.css
    const stylesPath = path.join(projectPath, 'src/styles.css');
    fs.writeFileSync(stylesPath, welcomePageContent.styles);
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
    const appComponentPath = path.join(projectPath, 'src/app/app.component.ts');
    const appComponentContent = `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '${projectName}';
  creationDate = '${creationDate}';
  count = 0;

  incrementCount() {
    this.count++;
  }
}`;
    fs.writeFileSync(appComponentPath, appComponentContent);

    const appComponentHtmlPath = path.join(projectPath, 'src/app/app.component.html');
    const appComponentHtmlContent = welcomePageContent.html
        .replace('{{projectName}}', '{{ title }}')
        .replace('{{creationDate}}', '{{ creationDate }}')
        .replace('{{filePath}}', 'src/app/app.component.html')
        .replace('{{clickHandler}}', '(click)="incrementCount()"')
        .replace('{{count}}', '{{ count }}');
    fs.writeFileSync(appComponentHtmlPath, appComponentHtmlContent);
}

function updateIndexHtml(projectPath, projectName) {
    const indexHtmlPath = path.join(projectPath, 'src/index.html');
    const content = fs.readFileSync(indexHtmlPath, 'utf-8');
    const updatedContent = content.replace(/<title>.*?<\/title>/, `<title>${projectName}</title>`);
    fs.writeFileSync(indexHtmlPath, updatedContent);
}

function displayNextSteps(projectName) {
    console.log('\nAngular project created successfully! 🎉');
    console.log(`\nNext steps:
1. cd ${projectName}
2. bun install
3. bun start`);
}

export default async function createAngularProject({ projectName }) {
    try {
        // Get creation date
        const creationDate = new Date().toLocaleString();

        // 1. Initialize the project
        const projectPath = initializeProject(projectName);

        // 2. Setup TailwindCSS
        setupTailwindCSS(projectPath);

        // 3. Create recommended folder structure
        createFolderStructure(projectPath);

        // 4. Update App component with minimal implementation
        updateAppComponent(projectPath, projectName, creationDate);

        // 5. Update index.html with project name
        updateIndexHtml(projectPath, projectName);

        // 6. Display next steps
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