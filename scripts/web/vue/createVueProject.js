import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function initializeProject(name) {
  console.log("Creating new Vue project...");
  execSync(
    `bun create vue@latest ${name} --ts --router --pinia --eslint --prettier`,
    {
      stdio: "inherit",
    }
  );
  return path.join(process.cwd(), name);
}

function createFolderStructure(projectPath) {
  const folderStructure = JSON.parse(
    fs.readFileSync(path.join(__dirname, "vueFolderStructure.json"), "utf-8")
  );
  folderStructure.folders.forEach((folder) => {
    const folderPath = path.join(projectPath, folder.path);
    fs.mkdirSync(folderPath, { recursive: true });
    fs.writeFileSync(path.join(folderPath, "README.md"), folder.description);
  });
}

function setupTailwindCSS(projectPath) {
  console.log("Setting up TailwindCSS...");
  execSync("bun add tailwindcss @tailwindcss/vite", {
    stdio: "inherit",
    cwd: projectPath,
  });
  const viteConfigPath = path.join(projectPath, "vite.config.ts");
  let viteConfigContent = fs.readFileSync(viteConfigPath, "utf-8");
  const lines = viteConfigContent.split("\n");
  lines.splice(3, 0, "import tailwindcss from '@tailwindcss/vite'");
  viteConfigContent = lines.join("\n");
  viteConfigContent = viteConfigContent.replace(
    /plugins:\s*\[\s*([\s\S]*?)\s*\]/,
    "plugins: [\n    $1\n    tailwindcss(),\n  ]"
  );
  fs.writeFileSync(viteConfigPath, viteConfigContent, "utf-8");
}

function updateProject(projectPath, projectName, creationDate) {
  const indexHtmlPath = path.join(projectPath, "index.html");
  const indexHtmlContent = fs.readFileSync(indexHtmlPath, "utf-8");
  const updatedIndexHtmlContent = indexHtmlContent.replace(
    /<title>.*<\/title>/,
    `<title>${projectName}</title>`
  );
  fs.writeFileSync(indexHtmlPath, updatedIndexHtmlContent, "utf-8");
  const appVuePath = path.join(projectPath, "src/App.vue");
  const appVueContent =
    `<template><main class="min-h-screen bg-gray-100 flex items-center justify-center">\n<div class="text-center">\n<h1 class="text-4xl font-bold text-gray-800 mb-4">Welcome to {{title}}</h1>\n<p class="text-gray-600 mb-8">Created on: {{creationDate}}</p>\n<p class="text-sm text-gray-500 mb-4">File: {{filePath}}</p>\n</div>\n</main></template>`
      .replace("{{creationDate}}", creationDate)
      .replace("{{filePath}}", "src/App.vue")
      .replace(
        "{{title}}",
        projectName
          .replace(/[_-]/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())
      );
  fs.writeFileSync(appVuePath, appVueContent, "utf-8");
  fs.unlinkSync(path.join(projectPath, "src/views/AboutView.vue"));
  fs.unlinkSync(path.join(projectPath, "src/views/HomeView.vue"));
  fs.unlinkSync(path.join(projectPath, "src/stores/counter.ts"));
  fs.unlinkSync(path.join(projectPath, "src/components/HelloWorld.vue"));
  fs.unlinkSync(path.join(projectPath, "src/components/TheWelcome.vue"));
  fs.unlinkSync(path.join(projectPath, "src/components/WelcomeItem.vue"));
  fs.unlinkSync(path.join(projectPath, "src/router/index.ts"));
  fs.unlinkSync(path.join(projectPath, "src/assets/logo.svg"));
  const mainPath = path.join(projectPath, "src/main.ts");
  let mainContent = fs.readFileSync(mainPath, "utf-8");
  mainContent = mainContent
    .split("\n")
    .filter(
      (line) =>
        !line.includes("import router from './router'") &&
        !line.includes("app.use(router)")
    )
    .join("\n");
  fs.writeFileSync(mainPath, mainContent, "utf-8");
  const mainCssPath = path.join(projectPath, "src/assets/main.css");
  fs.writeFileSync(mainCssPath, "@import './base.css';\n", "utf-8");
  const baseCssPath = path.join(projectPath, "src/assets/base.css");
  fs.writeFileSync(baseCssPath, "@import 'tailwindcss';\n", "utf-8");
}

function displayNextSteps(projectName) {
  console.log("\nVue project created successfully! 🎉");
  console.log(`\nNext steps:
1. cd ${projectName}
2. bun run dev`);
}

export default async function createVueProject({ projectName }) {
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
    updateProject(projectPath, projectName, creationDate);
    // 5. Display next steps
    displayNextSteps(projectName);
  } catch (error) {
    console.error("Error creating Vue project:", error);
    process.exit(1);
  }
}

// If running directly (not imported as a module)
if (require.main === module) {
  const projectName = process.argv[2];
  if (!projectName) {
    console.error("Please provide a project name");
    process.exit(1);
  }
  createVueProject({ projectName });
}
