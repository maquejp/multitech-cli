import fs from "fs";
import figlet from "figlet";
import chalk from "chalk";

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
    console.log(chalk.gray(`Version: ${version} | Author: ${author}\n`));
    console.log(chalk.yellow(`\nReport a bug: ${bugReportUrl}`));
}

main();