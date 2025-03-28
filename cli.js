import fs from "fs";
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import createWebProject from "./scripts/createWebProject.js";
import createMobileProject from "./scripts/createMobileProject.js";
import createBackendProject from "./scripts/createBackendProject.js";
import createDatabaseProject from "./scripts/createDatabaseProject.js";

const categories = {
  backend: ["apiplatform", "express", "springboot"],
  database: ["mariadb", "mongodb", "oracle", "postgresql"],
  mobile: ["flutter", "ionic", "reactnative"],
  web: ["angular", "astro", "react", "svelte", "vue"],
};

async function main() {
  const packageJson = JSON.parse(
    fs.readFileSync(new URL("./package.json", import.meta.url))
  );
  const version = packageJson.version;
  const bugReportUrl = packageJson.bugs.url;
  const author = packageJson.author.name;

  console.log(
    chalk.green(
      figlet.textSync("Project Creator", { horizontalLayout: "full" })
    )
  );
  console.log(
    chalk.cyan(
      `This tool will help you create projects based on your selected category and technology.\n`
    )
  );
  console.log(chalk.gray(`Version: ${version} | Author: ${author}\n`)); // Include author in the header

  const { command } = await inquirer.prompt([
    {
      type: "list",
      name: "command",
      message: "What would you like to do?",
      choices: ["Create a Project", "Help"],
    },
  ]);

  if (command === "Help") {
    console.log(chalk.blue("Available Categories and Technologies:"));
    for (const [category, technologies] of Object.entries(categories)) {
      console.log(chalk.green(`${category}: ${technologies.join(", ")}`));
    }
    console.log(chalk.yellow(`\nReport a bug: ${bugReportUrl}`));
    return; // Exit after showing help
  }

  const { category } = await inquirer.prompt([
    {
      type: "list",
      name: "category",
      message: "Select a category:",
      choices: Object.keys(categories),
    },
  ]);

  let technology;
  const technologyPrompt = {
    type: "list",
    name: "technology",
    message: "Select a technology:",
    choices: categories[category],
  };
  technology = await inquirer.prompt(technologyPrompt);

  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Enter the project name:",
      default: `${category}-${technology.technology}-app`,
      validate: (input) => {
        const isValid = /^[A-Za-z][A-Za-z0-9_-]*$/.test(input);
        if (!input) {
          return "Project name cannot be empty.";
        }
        if (!isValid) {
          return "Project name can only contain letters, numbers, hyphens, and underscores.";
        }
        return true;
      },
    },
  ]);

  switch (category) {
    case "web":
      await createWebProject({
        technology: technology.technology,
        projectName,
      });
      break;
    case "database":
      await createDatabaseProject({
        technology: technology.technology,
        projectName,
      });
      break;
    case "backend":
      await createBackendProject({
        technology: technology.technology,
        projectName,
      });
      break;
    case "mobile":
      await createMobileProject({
        technology: technology.technology,
        projectName,
      });
      break;
  }
}

main();
