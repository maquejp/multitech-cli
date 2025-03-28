import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function ({ projectName }) {
  console.log(`Creating a MariaDB database project named ${projectName}...`);

  try {
    // Create project directory
    const projectDir = path.join(process.cwd(), projectName);
    if (fs.existsSync(projectDir)) {
      throw new Error(`Directory ${projectName} already exists`);
    }
    fs.mkdirSync(projectDir);

    // Create subdirectories
    const directories = [
      "data", // For persistent data storage
      "migrations", // For database migrations
      "seeds", // For seed data
      "config", // For configuration files
      "scripts", // For utility scripts
    ];

    directories.forEach((dir) => {
      fs.mkdirSync(path.join(projectDir, dir));
    });

    // Copy docker-compose.yml from template
    const templateDir = path.join(__dirname, "templates");
    fs.copyFileSync(
      path.join(templateDir, "docker-compose.yml"),
      path.join(projectDir, "docker-compose.yml")
    );

    // Create .env file with default configuration
    const envContent = `MARIADB_ROOT_PASSWORD=rootpassword
MARIADB_USER=mariadbuser
MARIADB_PASSWORD=userpassword
MARIADB_DATABASE=${projectName}
MARIADB_PORT=3306`;
    fs.writeFileSync(path.join(projectDir, ".env"), envContent);

    // Read and process README template
    const readmeContent = JSON.parse(
      fs.readFileSync(path.join(templateDir, "readmeContent.json"), "utf8")
    );
    const processedReadmeContent = readmeContent.content.replace(
      /{{projectName}}/g,
      projectName
    );
    fs.writeFileSync(
      path.join(projectDir, "README.md"),
      processedReadmeContent
    );

    console.log("\nMariaDB project created successfully!");
    console.log("\nNext steps:");
    console.log(`1. cd ${projectName}`);
    console.log(
      "2. Review and modify the .env file with your desired settings"
    );
    console.log("3. docker compose up -d");
    console.log("4. Access the database at localhost:3306");
  } catch (error) {
    console.error("Error creating MariaDB project:", error);
    process.exit(1);
  }
}
