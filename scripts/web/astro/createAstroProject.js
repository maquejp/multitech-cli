import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function initializeProject(name) {
  console.log("Creating new Astro project...");
  execSync(
    `bun create astro@latest ${name} --template basics --install --git`,
    { stdio: "inherit" }
  );
  return path.join(process.cwd(), name);
}

function createFolderStructure(projectPath) {
  const folderStructure = JSON.parse(
    fs.readFileSync(path.join(__dirname, "astroFolderStructure.json"), "utf-8")
  );
  folderStructure.folders.forEach((folder) => {
    const folderPath = path.join(projectPath, folder.path);
    fs.mkdirSync(folderPath, { recursive: true });
    fs.writeFileSync(path.join(folderPath, "README.md"), folder.description);
  });
}

function setupTailwindCSS(projectPath) {
  console.log("Setting up TailwindCSS...");
  execSync("bun astro add tailwind -y", { stdio: "inherit", cwd: projectPath });
}

function updateProject(projectPath, projectName, creationDate) {
  const layoutPath = path.join(projectPath, "src/layouts/Layout.astro");
  let layoutContent = fs.readFileSync(layoutPath, "utf-8");
  layoutContent =
    '---\n import "../styles/global.css";\n ---\n\n' +
    layoutContent.replace(
      /<title>.*?<\/title>/,
      `<title>${projectName}</title>`
    );
  fs.writeFileSync(layoutPath, layoutContent, "utf-8");
  const welcomePath = path.join(projectPath, "src/components/Welcome.astro");
  const welcomeContent =
    `<main class="min-h-screen bg-gray-100 flex items-center justify-center">\n<div class="text-center">\n<h1 class="text-4xl font-bold text-gray-800 mb-4">Welcome to {{title}}</h1>\n<p class="text-gray-600 mb-8">Created on: {{creationDate}}</p>\n<p class="text-sm text-gray-500 mb-4">File: {{filePath}}</p>\n</div>\n</main>`
      .replace("{{creationDate}}", creationDate)
      .replace("{{filePath}}", "src/components/Welcome.astro")
      .replace(
        "{{title}}",
        projectName
          .replace(/[_-]/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())
      );
  fs.writeFileSync(welcomePath, welcomeContent, "utf-8");
}

function displayNextSteps(projectName) {
  console.log("\nAstro project created successfully! 🎉");
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
    console.error("Error creating Astro project:", error);
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
