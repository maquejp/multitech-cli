import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Format project name to follow Dart package naming conventions
function formatProjectName(name) {
  // Convert to lowercase
  let formattedName = name.toLowerCase();

  // Replace hyphens and spaces with underscores
  formattedName = formattedName.replace(/[-\s]/g, "_");

  // Remove any characters that aren't lowercase letters, numbers, or underscores
  formattedName = formattedName.replace(/[^a-z0-9_]/g, "");

  // Ensure it doesn't start with a number
  if (/^\d/.test(formattedName)) {
    formattedName = "app_" + formattedName;
  }

  // Ensure it's not empty
  if (!formattedName) {
    formattedName = "flutter_app";
  }

  return formattedName;
}

function initializeProject(name) {
  console.log("Creating new Flutter project...");
  const formattedName = formatProjectName(name);
  execSync(
    `flutter create --org net.maquestiaux --project-name ${formattedName} ${name}`,
    {
      stdio: "inherit",
    }
  );
  return path.join(process.cwd(), name);
}

function createFolderStructure(projectPath) {
  // Load folder structure from JSON file
  const folderStructure = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "flutterFolderStructure.json"),
      "utf-8"
    )
  );

  // Create folders and README files
  folderStructure.folders.forEach((folder) => {
    const folderPath = path.join(projectPath, folder.path);
    fs.mkdirSync(folderPath, { recursive: true });
    fs.writeFileSync(path.join(folderPath, "README.md"), folder.description);
  });
}

function updateDependencies(projectPath) {
  console.log("Updating dependencies...");

  // Define additional dependencies
  const additionalDependencies = [
    "flutter_bloc: ^8.1.3",
    "equatable: ^2.0.5",
    "get_it: ^7.6.0",
    "dio: ^5.3.2",
    "dartz: ^0.10.1",
    "shared_preferences: ^2.2.0",
  ];

  // Define additional dev dependencies
  const additionalDevDependencies = ["mockito: ^5.4.2"];

  // Add dependencies using flutter pub add
  additionalDependencies.forEach((dependency) => {
    const [pkgName, version] = dependency.split(": ");
    console.log(`Adding dependency: ${pkgName} ${version}`);
    execSync(`flutter pub add ${pkgName}`, {
      cwd: projectPath,
      stdio: "inherit",
    });
  });

  // Add dev dependencies using flutter pub add --dev
  additionalDevDependencies.forEach((dependency) => {
    const [pkgName, version] = dependency.split(": ");
    console.log(`Adding dev dependency: ${pkgName} ${version}`);
    execSync(`flutter pub add --dev ${pkgName}`, {
      cwd: projectPath,
      stdio: "inherit",
    });
  });
}

function enableAssets(projectPath) {
  console.log("Enabling assets in pubspec.yaml...");
  const pubspecPath = path.join(projectPath, "pubspec.yaml");
  let pubspecContent = fs.readFileSync(pubspecPath, "utf-8");

  // Check if active (non-commented) assets section already exists
  const lines = pubspecContent.split("\n");
  let hasActiveAssetsSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Check for non-commented assets: line
    if (line === "assets:" && i > 0 && !lines[i - 1].trim().startsWith("#")) {
      hasActiveAssetsSection = true;
      break;
    }
  }

  if (hasActiveAssetsSection) {
    console.log("Active assets section already exists in pubspec.yaml");
    return;
  }

  // Create the assets section
  const assetsSection = `

assets:
  - assets/images/
  - assets/icons/
  - assets/fonts/`;

  // Append the assets section at the end of the file
  pubspecContent = pubspecContent + assetsSection;

  // Write the updated pubspec.yaml
  fs.writeFileSync(pubspecPath, pubspecContent, "utf-8");
  console.log("Assets section added to pubspec.yaml");
}

function copyTemplateFiles(projectPath) {
  console.log("Copying template files...");
  const templatesDir = path.join(__dirname, "templates");

  // Check if templates directory exists
  if (!fs.existsSync(templatesDir)) {
    console.log("Templates directory not found. Skipping template file copy.");
    return;
  }

  // List of all template files to copy
  const listOfFiles = [
    "main.dart",
    "core/errors/failure.dart",
    "core/usecases/usecase.dart",
    "data/models/user_model.dart",
    "data/repositories/user_repository_impl.dart",
    "data/sources/remote/user_remote_source.dart",
    "domain/entities/user.dart",
    "domain/repositories/user_repository.dart",
    "domain/usecases/get_users.dart",
    "presentation/bloc/user_bloc.dart",
    "presentation/bloc/user_event.dart",
    "presentation/bloc/user_state.dart",
  ];

  // Copy each file from templates to the project
  for (const filePath of listOfFiles) {
    const sourcePath = path.join(templatesDir, filePath);
    const targetPath = path.join(projectPath, "lib", filePath);

    // Create target directory if it doesn't exist
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Copy the file
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied: ${filePath} -> lib/${filePath}`);
    } else {
      console.log(`Warning: Template file not found: ${filePath}`);
    }
  }

  console.log("Template files copied successfully");
}

function displayNextSteps(projectName) {
  console.log("\nFlutter project created successfully! 🎉");
  console.log(
    `\nNext steps:\n1. cd ${projectName}\n2. flutter pub get\n3. flutter run`
  );
}

export default async function createProject({ projectName }) {
  try {
    // Format the project name for Dart package naming conventions
    const formattedName = formatProjectName(projectName);
    console.log(`Original project name: ${projectName}`);
    console.log(`Formatted project name: ${formattedName}`);

    // 1. Initialize the project
    const projectPath = initializeProject(projectName);
    // 2. Create folder structure
    createFolderStructure(projectPath);
    // 3. Update dependencies
    updateDependencies(projectPath);
    // 4. Enable assets
    enableAssets(projectPath);
    // 5. Copy template files
    copyTemplateFiles(projectPath);
    // 6. Display next steps
    displayNextSteps(projectName);
  } catch (error) {
    console.error("Error creating Flutter project:", error);
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
