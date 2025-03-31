import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function initializeProject(name) {
  console.log("Creating new React Native project...");
  execSync(
    `npx react-native@latest init ${name} --template react-native-template-typescript`,
    {
      stdio: "inherit",
    }
  );
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

function setupNavigation(projectPath) {
  console.log("Setting up React Navigation...");
  execSync(
    "bun add @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context",
    {
      stdio: "inherit",
      cwd: projectPath,
    }
  );
}

function updateProject(projectPath, projectName, creationDate) {
  // Update App.tsx with a basic template
  const appPath = path.join(projectPath, "App.tsx");
  let appContent = fs.readFileSync(
    path.join(__dirname, "templates", "App.tsx.template"),
    "utf-8"
  );

  // Replace template variables
  appContent = appContent
    .replace(/{{projectName}}/g, projectName)
    .replace(/{{creationDate}}/g, creationDate);

  fs.writeFileSync(appPath, appContent, "utf-8");
}

function displayNextSteps(projectName) {
  console.log("\nReact Native project created successfully! 🎉");
  console.log(`\nNext steps:
1. cd ${projectName}
2. For iOS:
   - cd ios && pod install && cd ..
   - bun run ios
3. For Android:
   - bun run android
4. For development:
   - bun start`);
}

export default async function createProject({ projectName }) {
  try {
    // Get creation date
    const creationDate = new Date().toLocaleString();

    // 1. Initialize the project
    const projectPath = initializeProject(projectName);

    // 2. Setup navigation
    setupNavigation(projectPath);

    // 3. Create recommended folder structure
    createFolderStructure(projectPath);

    // 4. Update project with minimal implementation
    updateProject(projectPath, projectName, creationDate);

    // 5. Display next steps
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
