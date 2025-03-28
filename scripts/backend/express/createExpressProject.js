import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the structure.json file
const structure = JSON.parse(
  fs.readFileSync(path.join(__dirname, "structure.json"), "utf8")
);

// Read the readmeContent.json file
const readmeContent = JSON.parse(
  fs.readFileSync(path.join(__dirname, "readmeContent.json"), "utf8")
);

// Read the appContent.json file
const appContent = JSON.parse(
  fs.readFileSync(path.join(__dirname, "appContent.json"), "utf8")
);

export default async function createExpressProject({ projectName }) {
  try {
    // Create project directory
    fs.mkdirSync(projectName);
    process.chdir(projectName);

    // Initialize npm project
    execSync("npm init -y", { stdio: "inherit" });

    // Install dependencies
    const dependencies = [
      "express",
      "dotenv",
      "cors",
      "helmet",
      "morgan",
      "express-validator",
    ];

    const devDependencies = ["nodemon", "eslint", "prettier"];

    execSync(`npm install ${dependencies.join(" ")}`, { stdio: "inherit" });
    execSync(`npm install -D ${devDependencies.join(" ")}`, {
      stdio: "inherit",
    });

    // Create directories and README files from structure.json
    structure.folders.forEach((folder) => {
      // Create directory
      fs.mkdirSync(folder.path, { recursive: true });

      // Create README.md
      fs.writeFileSync(path.join(folder.path, "README.md"), folder.description);
    });

    // Create main application file with project name
    const mainAppContent = appContent.content.replace(
      /{{projectName}}/g,
      projectName
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    );
    fs.writeFileSync("src/app.js", mainAppContent);

    // Create .env file
    const envContent = `PORT=3000
NODE_ENV=development
`;

    fs.writeFileSync(".env", envContent);

    // Create .gitignore
    const gitignoreContent = `node_modules/
.env
.DS_Store
coverage/
dist/
*.log
`;

    fs.writeFileSync(".gitignore", gitignoreContent);

    // Update package.json with scripts
    const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
    packageJson.type = "module";
    packageJson.scripts = {
      start: "node src/app.js",
      dev: "nodemon src/app.js",
      lint: "eslint .",
      format: "prettier --write .",
    };
    fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));

    // Create ESLint config
    const eslintConfig = {
      env: {
        node: true,
        es2021: true,
      },
      extends: ["eslint:recommended"],
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      rules: {
        "no-console": "warn",
        "no-unused-vars": "warn",
      },
    };

    fs.writeFileSync(".eslintrc.json", JSON.stringify(eslintConfig, null, 2));

    // Create Prettier config
    const prettierConfig = {
      semi: true,
      trailingComma: "es5",
      singleQuote: true,
      printWidth: 100,
      tabWidth: 2,
    };

    fs.writeFileSync(".prettierrc", JSON.stringify(prettierConfig, null, 2));

    // Create main README.md with project name
    const mainReadmeContent = readmeContent.content.replace(
      /{{projectName}}/g,
      projectName
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    );
    fs.writeFileSync("README.md", mainReadmeContent);

    console.log("\nExpress.js project created successfully!");
    console.log("\nNext steps:");
    console.log(`1. cd ${projectName}`);
    console.log("2. npm run dev");
  } catch (error) {
    console.error("Error creating Express.js project:", error);
    throw error;
  }
}
