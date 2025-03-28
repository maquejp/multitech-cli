import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import createExpressProject from "./backend/express/createExpressProject.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frameworks = {
  express: {
    name: "Express.js",
    description: "A minimal and flexible Node.js web application framework",
    create: createExpressProject,
  },
  // Add more backend frameworks here as needed
};

function displayFrameworks() {
  console.log("\nAvailable backend frameworks:");
  Object.entries(frameworks).forEach(([key, framework]) => {
    console.log(`  ${key.padEnd(10)} - ${framework.name}`);
    console.log(`            ${framework.description}`);
  });
}

function validateFramework(technology) {
  if (!frameworks[technology]) {
    console.error(`Invalid framework: ${technology}`);
    displayFrameworks();
    process.exit(1);
  }
}

function validateProjectName(name) {
  if (!name) {
    console.error("Please provide a project name");
    process.exit(1);
  }

  // Check if directory already exists
  if (fs.existsSync(name)) {
    console.error(`Directory ${name} already exists`);
    process.exit(1);
  }

  // Check if name is a valid npm package name
  if (!/^[a-z0-9-]+$/.test(name)) {
    console.error(
      "Project name must be lowercase and can only contain letters, numbers, and hyphens"
    );
    process.exit(1);
  }
}

export default async function createBackendProject({
  technology,
  projectName,
}) {
  try {
    // Validate inputs
    validateFramework(technology);
    validateProjectName(projectName);

    // Create project
    await frameworks[technology].create({ projectName });
  } catch (error) {
    console.error("Error creating backend project:", error);
    process.exit(1);
  }
}

// If running directly (not imported as a module)
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error(
      "Usage: node createBackendProject.js <technology> <project-name>"
    );
    displayFrameworks();
    process.exit(1);
  }

  const [technology, projectName] = args;
  createBackendProject({ technology, projectName });
}
