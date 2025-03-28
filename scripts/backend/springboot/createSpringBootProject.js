import fs, { unlink } from "fs";
import path from "path";
import { execSync } from "child_process";
import https from "https";
import extract from "extract-zip";

const javaPath = execSync(
  process.platform === "win32" ? "where java" : "which java"
)
  .toString()
  .trim();
const javaHome = path.dirname(path.dirname(javaPath));

export default async function ({ projectName }) {
  console.log(`Creating a Spring Boot project named ${projectName}...`);

  try {
    // Create project directory
    const projectDir = path.join(process.cwd(), projectName);
    if (fs.existsSync(projectDir)) {
      throw new Error(`Directory ${projectName} already exists`);
    }
    fs.mkdirSync(projectDir);

    // Convert project name to package name format (dashes to underscores)
    const packageName = projectName.replace(/-/g, "_");

    // Spring Initializr API parameters
    const params = {
      type: "maven-project",
      language: "java",
      bootVersion: "3.4.4",
      groupId: "net.maquestiaux",
      artifactId: projectName,
      name: projectName,
      description: `Spring Boot project for ${projectName
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())}`,
      packageName: `net.maquestiaux.${packageName}`,
      packaging: "jar",
      javaVersion: "21",
      dependencies: "web,devtools",
    };

    const springBootUrl = new URL("https://start.spring.io/starter.zip");

    // Append parameters to the URL's search parameters
    Object.keys(params).forEach((key) => {
      springBootUrl.searchParams.append(key, params[key]);
    });

    https
      .get(springBootUrl, (response) => {
        if (response.statusCode !== 200) {
          throw new Error(
            `Failed to download Spring Boot project: ${response.statusMessage}`
          );
        }
        const zipFilePath = path.join(projectDir, "project.zip");
        const file = fs.createWriteStream(zipFilePath);
        response.pipe(file);
        file.on("finish", async () => {
          console.log("ZIP file downloaded.");
          extract(zipFilePath, { dir: projectDir }).then(() => {
            console.log("ZIP file extracted.");
            fs.unlinkSync(zipFilePath);
            console.log("Setting execute permissions for mvnw...");
            execSync(`chmod +x ${projectDir}/mvnw`);
            execSync(`./mvnw wrapper:wrapper`, {
              cwd: projectDir,
              stdio: "inherit",
              env: { ...process.env, JAVA_HOME: javaHome },
            });

            // Create additional directory structure and READMEs
            const structure = JSON.parse(
              fs.readFileSync(
                path.join(__dirname, "springbootFolderStructure.json"),
                "utf-8"
              )
            );

            // Convert groupId dots to slashes and create the full package path
            const groupIdPath = params.groupId.replace(/\./g, "/");
            const packagePath = `${groupIdPath}/${packageName}`;

            structure.folders.forEach((folder) => {
              const folderPath = path.join(
                projectDir,
                folder.path.replace(/{{groupId}}/g, packagePath)
              );
              fs.mkdirSync(folderPath, { recursive: true });
              fs.writeFileSync(
                path.join(folderPath, "README.md"),
                folder.description
              );
            });

            // Create WelcomeController from template
            const controllerPath = path.join(
              projectDir,
              "src/main/java",
              packagePath,
              "controller/WelcomeController.java"
            );

            const templatePath = path.join(
              __dirname,
              "templates/WelcomeController.java.template"
            );
            let controllerContent = fs.readFileSync(templatePath, "utf-8");

            // Replace placeholders in template
            controllerContent = controllerContent
              .replace(/{{packageName}}/g, `net.maquestiaux.${packageName}`)
              .replace(
                /{{formattedProjectName}}/g,
                projectName
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())
              );

            fs.writeFileSync(controllerPath, controllerContent);

            console.log("\nSpringboot project created successfully!");
            console.log("\nNext steps:");
            console.log(`1. cd ${projectName}`);
            console.log(`2. export JAVA_HOME=(which java)`);
            console.log("3. `./mvnw spring-boot:run` to start the server");
            console.log("4. Go to http://localhost:8080");
          });
        });

        file.on("error", (fileError) => {
          throw new Error(`File write error: ${fileError}`);
        });
      })
      .on("error", (err) => console.log(`Download error: ${err}`));
  } catch (error) {
    throw error;
  }
}
