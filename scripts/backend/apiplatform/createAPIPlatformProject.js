import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the readmeContent.json file
const readmeContent = JSON.parse(
  fs.readFileSync(path.join(__dirname, "readmeContent.json"), "utf8")
);

export default async function ({ projectName }) {
  console.log(`Creating an API Platform project named ${projectName}...`);

  try {
    // Create project directory
    const projectDir = path.join(process.cwd(), projectName);
    if (fs.existsSync(projectDir)) {
      throw new Error(`Directory ${projectName} already exists`);
    }
    fs.mkdirSync(projectDir);

    // Copy template files
    const templateDir = path.join(__dirname, "templates");
    const files = [
      "docker-compose.yml",
      "Dockerfile",
      "default.conf",
      "supervisord.conf",
      "setup.sh",
    ];

    files.forEach((file) => {
      fs.copyFileSync(
        path.join(templateDir, file),
        path.join(projectDir, file)
      );
    });

    // Make setup.sh executable
    fs.chmodSync(path.join(projectDir, "setup.sh"), "755");

    // Create .env file with project name
    fs.writeFileSync(
      path.join(projectDir, ".env"),
      `PROJECT_NAME=${projectName}\n`
    );

    // Create README.md with project name
    const mainReadmeContent = readmeContent.content.replace(
      /{{projectName}}/g,
      projectName
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    );
    fs.writeFileSync(path.join(projectDir, "README.md"), mainReadmeContent);

    console.log("\nAPI Platform project created successfully!");
    console.log("\nNext steps:");
    console.log(`1. cd ${projectName}`);
    console.log("2. docker compose up --build");
    console.log("3. Access the API at http://localhost:8086");
    console.log("4. Access the API documentation at http://localhost:8086/api");
    console.log("5. Access the test at http://localhost:8086/hello-api");
  } catch (error) {
    console.error("Error creating API Platform project:", error);
    process.exit(1);
  }
}
