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
    `npm create astro@latest ${name} -- --template basics --typescript strict --git --install --no-hooks`,
    {
      stdio: 'inherit',
    }
  );
  return path.join(process.cwd(), name);
}

function setupTailwindCSS(projectPath) {
  console.log('Setting up TailwindCSS...');
  execSync('npm install -D tailwindcss @astrojs/tailwind postcss autoprefixer', {
    cwd: projectPath,
    stdio: 'inherit',
  });

  // Configure TailwindCSS
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
  fs.writeFileSync(path.join(projectPath, 'tailwind.config.mjs'), tailwindConfig);

  // Update astro.config.mjs
  const astroConfigPath = path.join(projectPath, 'astro.config.mjs');
  const astroConfig = `import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
});`;
  fs.writeFileSync(astroConfigPath, astroConfig);

  // Update global.css
  const stylesPath = path.join(projectPath, 'src/styles/global.css');
  fs.writeFileSync(stylesPath, welcomePageContent.styles);
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
  const indexContent = `---
import Layout from '../layouts/Layout.astro';

const count = Astro.react.useState(0);
---

<Layout title="${projectName}">
${welcomePageContent.html
      .replace('{{projectName}}', projectName)
      .replace('{{creationDate}}', creationDate)
      .replace('{{filePath}}', 'src/pages/index.astro')
      .replace('{{clickHandler}}', 'onClick={() => count.set(count.get() + 1)}')
      .replace('{{count}}', '{count.get()}')}
</Layout>`;
  fs.writeFileSync(indexPath, indexContent);

  // Update Layout.astro
  const layoutPath = path.join(projectPath, 'src/layouts/Layout.astro');
  const layoutContent = `---
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="Astro description" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>

<style is:global>
  @import '../styles/global.css';
</style>`;
  fs.writeFileSync(layoutPath, layoutContent);
}

function displayNextSteps(projectName) {
  console.log('\nAstro project created successfully! 🎉');
  console.log(`\nNext steps:
1. cd ${projectName}
2. npm install
3. npm run dev`);
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