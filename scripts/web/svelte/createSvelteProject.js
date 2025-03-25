import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { welcomePageContent } from '../shared/welcomePage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function initializeProject(name) {
    console.log('Creating new Svelte project...');
    execSync(
        `bun create vite@latest ${name} -- --template svelte-ts`,
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
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
    fs.writeFileSync(path.join(projectPath, 'tailwind.config.js'), tailwindConfig);

    // Create postcss.config.js
    const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;
    fs.writeFileSync(path.join(projectPath, 'postcss.config.js'), postcssConfig);

    // Update global.css
    const stylesPath = path.join(projectPath, 'src/app.css');
    fs.writeFileSync(stylesPath, welcomePageContent.styles);
}

function createFolderStructure(projectPath) {
    const folderStructure = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'svelteFolderStructure.json'), 'utf-8')
    );

    folderStructure.folders.forEach((folder) => {
        const folderPath = path.join(projectPath, folder.path);
        fs.mkdirSync(folderPath, { recursive: true });
        fs.writeFileSync(path.join(folderPath, 'README.md'), folder.description);
    });
}

function updateAppComponent(projectPath, projectName, creationDate) {
    // Update App.svelte
    const appPath = path.join(projectPath, 'src/App.svelte');
    const appContent = `<script lang="ts">
    let count = 0;
</script>

${welcomePageContent.html
            .replace('{{projectName}}', projectName)
            .replace('{{creationDate}}', creationDate)
            .replace('{{filePath}}', 'src/App.svelte')
            .replace('{{clickHandler}}', 'on:click={() => count++}')
            .replace('{{count}}', '{count}')}

<style>
    @import './app.css';
</style>`;
    fs.writeFileSync(appPath, appContent);

    // Update index.html
    const indexPath = path.join(projectPath, 'index.html');
    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    const updatedIndexContent = indexContent.replace(
        /<title>.*?<\/title>/,
        `<title>${projectName}</title>`
    );
    fs.writeFileSync(indexPath, updatedIndexContent);
}

function displayNextSteps(projectName) {
    console.log('\nSvelte project created successfully! 🎉');
    console.log(`\nNext steps:
1. cd ${projectName}
2. bun install
3. bun run dev`);
}

export default async function createSvelteProject({ projectName }) {
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

        // 5. Display next steps
        displayNextSteps(projectName);
    } catch (error) {
        console.error('Error creating Svelte project:', error);
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
    createSvelteProject({ projectName });
} 