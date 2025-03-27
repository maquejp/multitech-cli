import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function initializeProject(name) {
  console.log("Creating new Angular project...");
  execSync(
    `ng new ${name} --style=css --ssr=false --skip-tests=true --strict=true --package-manager bun`,
    { stdio: "inherit" }
  );
  return path.join(process.cwd(), name);
}

function createFolderStructure(projectPath) {
  const folderStructure = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "angularFolderStructure.json"),
      "utf-8"
    )
  );
  folderStructure.folders.forEach((folder) => {
    const folderPath = path.join(projectPath, folder.path);
    fs.mkdirSync(folderPath, { recursive: true });
    fs.writeFileSync(path.join(folderPath, "README.md"), folder.description);
  });
}

function setupTailwindCSS(projectPath) {
  console.log("Setting up TailwindCSS...");
  execSync("bun add tailwindcss @tailwindcss/postcss postcss", {
    stdio: "inherit",
    cwd: projectPath,
  });
  const postcssrcjsonContent =
    '{  "plugins": {    "@tailwindcss/postcss": {}  }}';
  fs.writeFileSync(
    path.join(projectPath, ".postcssrc.json"),
    postcssrcjsonContent,
    "utf-8"
  );
  const indexCssPath = path.join(projectPath, "src/styles.css");
  const currentContent = fs.readFileSync(indexCssPath, "utf-8");
  const newContent = currentContent + '@import "tailwindcss";\n';
  fs.writeFileSync(indexCssPath, newContent, "utf-8");
}

function updateProject(projectPath, projectName, creationDate) {
  const appComponentHtmlPath = path.join(
    projectPath,
    "src/app/app.component.html"
  );
  const appComponentHtmlContent =
    `<main class="min-h-screen bg-gray-100 flex items-center justify-center">\n<div class="text-center">\n<h1 class="text-4xl font-bold text-gray-800 mb-4">Welcome to {{title}}</h1>\n<p class="text-gray-600 mb-8">Created on: {{creationDate}}</p>\n<p class="text-sm text-gray-500 mb-4">File: {{filePath}}</p>\n</div>\n</main>`
      .replace("{{creationDate}}", creationDate)
      .replace("{{filePath}}", "src/app/app.component.html");
  fs.writeFileSync(appComponentHtmlPath, appComponentHtmlContent, "utf-8");
  const appComponentTsPath = path.join(projectPath, "src/app/app.component.ts");
  let appComponentTsContent = fs.readFileSync(appComponentTsPath, "utf-8");
  appComponentTsContent = appComponentTsContent.replace(
    /imports:\s*\[\s*RouterOutlet\s*\]/,
    "imports: []"
  );
  appComponentTsContent = appComponentTsContent.replace(
    /import\s*\{\s*RouterOutlet\s*\}\s*from\s*['"]@angular\/router['"];\s*\n?/,
    ""
  );
  appComponentTsContent = appComponentTsContent.replace(
    /title = '[^']+';/,
    `title = '${projectName
      .replace(/[_-]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())}';`
  );
  fs.writeFileSync(appComponentTsPath, appComponentTsContent, "utf-8");
  const indexPath = path.join(projectPath, "src/index.html");
  let indexContent = fs.readFileSync(indexPath, "utf-8");
  indexContent = indexContent.replace(
    /<title>.*?<\/title>/,
    `<title>${projectName}</title>`
  );
  fs.writeFileSync(indexPath, indexContent);
}

function displayNextSteps(projectName) {
  console.log("\nAngular project created successfully! 🎉");
  console.log(`\nNext steps:\n1. cd ${projectName}\n2. bun start`);
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
    console.error("Error creating Angular project:", error);
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
