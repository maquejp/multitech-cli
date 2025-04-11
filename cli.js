import fs from "fs";

async function main() {
  const packageJson = JSON.parse(
    fs.readFileSync(new URL("./package.json", import.meta.url))
  );
  const version = packageJson.version;
  const bugReportUrl = packageJson.bugs.url;
  const author = packageJson.author.name;
  console.log(version, bugReportUrl, author);
}

main();
