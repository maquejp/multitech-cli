import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function initializeProject(name) {
  console.log("Creating new React project...");
  execSync(`bun create vite@latest ${name} --template react-ts`, {
    stdio: "inherit",
  });
  return path.join(process.cwd(), name);
}

function createFolderStructure(projectPath) {
  const folderStructure = JSON.parse(
    fs.readFileSync(path.join(__dirname, "reactFolderStructure.json"), "utf-8")
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
    /plugins:\s*\[\s*react\(\)\s*\]/,
    "plugins: [react(), tailwindcss()]"
  );
  fs.writeFileSync(viteConfigPath, viteConfigContent, "utf-8");
  const indexCssPath = path.join(projectPath, "src/index.css");
  fs.writeFileSync(indexCssPath, '@import "tailwindcss";\n');
}

function updateProject(projectPath, projectName, creationDate) {
  const indexPath = path.join(projectPath, "index.html");
  let indexContent = fs.readFileSync(indexPath, "utf-8");
  indexContent = indexContent.replace(
    /<title>.*?<\/title>/,
    `<title>${projectName}</title>`
  );
  fs.writeFileSync(indexPath, indexContent);
  const appCssPath = path.join(projectPath, "src/App.css");
  fs.writeFileSync(appCssPath, "");
  const appPath = path.join(projectPath, "src/App.tsx");
  let appContent = fs.readFileSync(appPath, "utf-8");
  appContent = appContent
    .split("\n")
    .filter(
      (line) =>
        !line.includes("import { useState } from 'react'") &&
        !line.includes("import reactLogo from './assets/react.svg'") &&
        !line.includes("import viteLogo from '/vite.svg'") &&
        !line.includes("const [count, setCount] = useState(0)")
    )
    .join("\n");
  appContent = appContent
    .replace(
      /<>\s*([\s\S]*?)\s*<\/>/,
      `<><main className="min-h-screen bg-gray-100 flex items-center justify-center">\n<div className="text-center">\n<h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to {{title}}</h1>\n  <p className="text-gray-600 mb-8">Created on: {{creationDate}}</p>\n<p className="text-sm text-gray-500 mb-4">File: {{filePath}}</p>\n</div>\n</main></>`
    )
    .replace("{{creationDate}}", creationDate)
    .replace("{{filePath}}", "src/App.tsx")
    .replace(
      "{{title}}",
      projectName
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    );
  fs.writeFileSync(appPath, appContent, "utf-8");
}

function displayNextSteps(projectName) {
  console.log("\nReact project created successfully! 🎉");
  console.log(`\nNext steps:\n1. cd ${projectName}\n2. bun run dev`);
}

export default async function createProject({ projectName }) {
  try {
    // Get creation date
    const creationDate = new Date().toLocaleString();
    // 1. Initialize the project
    const projectPath = initializeProject(projectName);
    // 2. Setup TailwindCSS
    setupTailwindCSS(projectPath);
    // 3. Create recommended folder structure
    createFolderStructure(projectPath);
    // 4. Update project with minimal implementation
    updateProject(projectPath, projectName, creationDate);
    // 5. Display next steps
    displayNextSteps(projectName);
  } catch (error) {
    console.error("Error creating React project:", error);
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
  createProject({ projectName });
}
