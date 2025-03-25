import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function initializeProject(name) {
  console.log('Creating new Astro project...');
  execSync(
    `bun create astro@latest ${name} -- --template basics --typescript strict --git --install --no-hooks`,
    {
      stdio: 'inherit',
    }
  );
  return path.join(process.cwd(), name);
}

function setupTailwindCSS(projectPath) {
  console.log('Setting up TailwindCSS...');
  execSync('bun astro add tailwind -y', {
    cwd: projectPath,
    stdio: 'inherit',
  });
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

function updateIndexPage(projectPath, projectName, creationDate) {
  // Update index.astro
  const indexPath = path.join(projectPath, 'src/pages/index.astro');
  const indexContent = `
  ---
  import Layout from '../layouts/Layout.astro';
  ---
  <Layout title="${projectName}">
    <main class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Welcome to ${projectName}</h1>
        <p class="text-gray-600">Created on: ${creationDate}</p>
      </div>
    </main>
  </Layout>`;
  fs.writeFileSync(indexPath, indexContent);

  // Update Layout.astro
  const layoutPath = path.join(projectPath, 'src/layouts/Layout.astro');
  const layoutContent = readFileSync(layoutPath, "utf-8");
  const updatedLayoutContent =
    '---\n import "../styles/global.css";\n ---\n\n' +
    layoutContent.replace(
      /<title>.*<\/title>/,
      `<title>${formattedProjectName}</title>`
    );
  fs.writeFileSync(updatedLayoutContent, layoutContent);
}

function displayNextSteps(projectName) {
  console.log('\nAstro project created successfully! 🎉');
  console.log(`\nNext steps:
1. cd ${projectName}
2. npm run dev`);
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