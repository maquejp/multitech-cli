import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the readmeContent.json file
const readmeContent = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "templates", "readmeContent.json"),
    "utf8"
  )
);

function createFolderStructure(projectPath) {
  //   const folderStructure = JSON.parse(
  //     fs.readFileSync(path.join(__dirname, "ionicFolderStructure.json"), "utf-8")
  //   );
  //   folderStructure.folders.forEach((folder) => {
  //     const folderPath = path.join(projectPath, folder.path);
  //     fs.mkdirSync(folderPath, { recursive: true });
  //     fs.writeFileSync(path.join(folderPath, "README.md"), folder.description);
  //   });
}

function initializeProject(projectName) {
  const projectPath = path.join(process.cwd(), projectName);
  if (fs.existsSync(projectPath)) {
    throw new Error(`Directory ${projectName} already exists`);
  }
  execSync("npm install -g @ionic/cli", { stdio: "inherit" });
  execSync(
    `ionic start ${projectName} tabs --type angular --capacitor --no-interactive --standalone --no-git`,
    { stdio: "inherit" }
  );
  return projectPath;
}

function updateProject(projectPath, projectName, creationDate) {
  // Update app.module.ts with project name
  const appContentPath = path.join(projectPath, "src/app/tab1/tab1.page.html");
  let appContentTemplate = fs.readFileSync(
    "scripts/mobile/ionic/templates/tab1.page.html.template",
    "utf-8"
  );
  appContentTemplate = appContentTemplate
    .replace(
      /{{projectName}}/g,
      projectName
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    )
    .replace("{{creationDate}}", creationDate);
  fs.writeFileSync(appContentPath, appContentTemplate);
}

function displayNextSteps(projectName) {
  console.log("\nIonic project created successfully!");
  console.log("\nNext steps:");
  console.log(`1. cd ${projectName}`);
  console.log("2. ionic serve");
  console.log("\nAvailable commands:");
  console.log("- ionic serve: Start the development server");
  console.log("- ionic build: Build the project");
  console.log("- ionic capacitor add android: Add Android platform");
  console.log("- ionic capacitor add ios: Add iOS platform");
  console.log("- ionic capacitor copy: Copy web assets to native platforms");
  console.log("- ionic capacitor open android: Open Android project");
  console.log("- ionic capacitor open ios: Open iOS project");
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
    console.error("Error creating Ionic project:", error);
    process.exit(1);
  }
}
