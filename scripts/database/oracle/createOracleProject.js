import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function ({ projectName }) {
  console.log(`Creating an Oracle database project named ${projectName}...`);

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

    // Set proper permissions for data directory
    const dataDir = path.join(projectDir, "data");
    fs.chmodSync(dataDir, "777"); // Give full permissions to the data directory

    // Copy docker-compose.yml from template
    const templateDir = path.join(__dirname, "templates");
    fs.copyFileSync(
      path.join(templateDir, "docker-compose.yml"),
      path.join(projectDir, "docker-compose.yml")
    );

    // Create .env file with default configuration
    const envContent = `ORACLE_SID=${projectName}
ORACLE_PDB=${projectName}_pdb
ORACLE_PWD=oracle
ORACLE_CHARACTERSET=AL32UTF8
ORACLE_PORT=1521`;
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

    console.log("\nOracle database project created successfully!");
    console.log("\nNext steps:");
    console.log(`1. cd ${projectName}`);
    console.log(
      "2. Review and modify the .env file with your desired settings"
    );
    console.log("3. docker compose up -d");
    console.log("4. Access the database at localhost:1521");
    console.log(
      "5. Connect using sqlplus: sqlplus sys/oracle@localhost:1521/ORCLCDB as sysdba"
    );
  } catch (error) {
    console.error("Error creating Oracle database project:", error);
    process.exit(1);
  }
}
