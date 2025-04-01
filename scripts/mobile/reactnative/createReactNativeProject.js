import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function initializeProject(name) {
  console.log("Creating new React Native project...");
  execSync(`bun create expo@latest ${name}`, {
    stdio: "inherit",
  });
  return path.join(process.cwd(), name);
}

function createFolderStructure(projectPath) {
  const folderStructure = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "reactNativeFolderStructure.json"),
      "utf-8"
    )
  );
  folderStructure.folders.forEach((folder) => {
    const folderPath = path.join(projectPath, folder.path);
    fs.mkdirSync(folderPath, { recursive: true });
    fs.writeFileSync(path.join(folderPath, "README.md"), folder.description);
  });
}

function updateProject(projectPath, projectName, creationDate) {
  // Update App.tsx with a basic template
  const appPath = path.join(projectPath, "app/(tabs)/index.tsx");
  let appContent = fs.readFileSync(appPath, "utf-8");

  // Replace template variables
  appContent = appContent.replace(
    /Welcome!/g,
    "Welcome to " +
      projectName
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()) +
      " Created on: " +
      creationDate +
      " !"
  );

  fs.writeFileSync(appPath, appContent, "utf-8");
}

function displayNextSteps(projectName) {
  console.log("\nReact Native project created successfully! 🎉");
  console.log(
    `\nNext steps:\n1. cd ${projectName}\n2. For iOS:\n\t- bun run ios\n3. For Android:\n\t- bun run android\n4. For Web:\n\t- bun run web\n5. For development:\n\t- bun start`
  );
}

export default async function createProject({ projectName }) {
  try {
    // Get creation date
    const creationDate = new Date().toLocaleString();
    // 1. Initialize the project
    const projectPath = initializeProject(projectName);
    // 2. Create recommended folder structure
    createFolderStructure(projectPath);
    // 3. Update project with minimal implementation
    updateProject(projectPath, projectName, creationDate);
    // 4. Display next steps
    displayNextSteps(projectName);
  } catch (error) {
    console.error("Error creating React Native project:", error);
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
