import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { welcomePageContent } from '../shared/welcomePage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function initializeProject(name) {
  console.log('Creating new Astro project...');
  execSync(
    `bun create astro@latest ${name} --template basics --install --git`,
    {
      stdio: 'inherit',
    }
  );
  return path.join(process.cwd(), name);
}

function createFolderStructure(projectPath) {
  const folderStructure = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'astroFolderStructure.json'), 'utf-8')
  );

  // Create main folders and their README files
  folderStructure.folders.forEach((folder) => {
    const folderPath = path.join(projectPath, folder.path);
    fs.mkdirSync(folderPath, { recursive: true });
    fs.writeFileSync(path.join(folderPath, 'README.md'), folder.description);
  });
}

function setupTailwindCSS(projectPath) {
  console.log('Setting up TailwindCSS...');
}

function updateIndexPage(projectPath, projectName, creationDate) {
  // Update index.astro
  const indexPath = path.join(projectPath, 'src/pages/index.astro');
  const indexContent = `${creationDate} ${projectName}`;
}

function displayNextSteps(projectName) {
  console.log('\nAstro project created successfully! 🎉');
  console.log(`\nNext steps:
1. cd ${projectName}
2. bun run dev`);
}

export default async function createAstroProject({ projectName }) {
  try {
    // Get creation date
    const creationDate = new Date().toLocaleString();

    // 1. Initialize the project
    const projectPath = initializeProject(projectName);

    // 2. Setup TailwindCSS
    setupTailwindCSS(projectPath);

    // 3. Create recommended folder structure
    createFolderStructure(projectPath);

    // 4. Update index page with minimal implementation
    updateIndexPage(projectPath, projectName, creationDate);

    // 5. Display next steps
    displayNextSteps(projectName);
  } catch (error) {
    console.error('Error creating Astro project:', error);
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
  createAstroProject({ projectName });
} 