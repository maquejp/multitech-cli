import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { welcomePageContent } from '../shared/welcomePage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function initializeProject(name) {
  console.log('Creating new React project...');
  execSync(
    `bun create vite@latest ${name} -- --template react-ts`,
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

  // Initialize TailwindCSS
  execSync('npx tailwindcss init -p', {
    cwd: projectPath,
    stdio: 'inherit',
  });

  // Configure TailwindCSS
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
  fs.writeFileSync(path.join(projectPath, 'tailwind.config.js'), tailwindConfig);

  // Update index.css
  const stylesPath = path.join(projectPath, 'src/index.css');
  fs.writeFileSync(stylesPath, welcomePageContent.styles);
}

function createFolderStructure(projectPath) {
  const folderStructure = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'reactFolderStructure.json'), 'utf-8')
  );

  folderStructure.folders.forEach((folder) => {
    const folderPath = path.join(projectPath, folder.path);
    fs.mkdirSync(folderPath, { recursive: true });
    fs.writeFileSync(path.join(folderPath, 'README.md'), folder.description);
  });
}

function updateAppComponent(projectPath, projectName, creationDate) {
  const appPath = path.join(projectPath, 'src/App.tsx');
  const appContent = `import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
${welcomePageContent.html
      .replace('{{projectName}}', projectName)
      .replace('{{creationDate}}', creationDate)
      .replace('{{filePath}}', 'src/App.tsx')
      .replace('{{clickHandler}}', 'onClick={() => setCount((count) => count + 1)}')
      .replace('{{count}}', '{count}')}
  )
}

export default App`;
  fs.writeFileSync(appPath, appContent);
}

function displayNextSteps(projectName) {
  console.log('\nReact project created successfully! 🎉');
  console.log(`\nNext steps:
1. cd ${projectName}
2. bun install
3. bun run dev`);
}

export default async function createReactProject({ projectName }) {
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
    console.error('Error creating React project:', error);
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
  createReactProject({ projectName });
}
