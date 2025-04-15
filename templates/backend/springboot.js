/**
 * Spring Boot project template
 * This is a dummy script that will be replaced with actual project generation logic
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from "https";
import extract from "extract-zip";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const javaPath = execSync(
    process.platform === "win32" ? "where java" : "which java"
)
    .toString()
    .trim();
const javaHome = path.dirname(path.dirname(javaPath));

export function createSpringBootProject(projectName) {
    const projectPath = path.join(process.cwd(), projectName);
    const templatePath = path.join(__dirname, 'templates', 'springboot');
    const zipFilePath = path.join(process.cwd(), `${projectName}.zip`);

    // Check if directory already exists
    if (fs.existsSync(projectPath)) {
        console.error(`Error: Directory ${projectName} already exists`);
        process.exit(1);
    }

    try {
        // Create project directory
        fs.mkdirSync(projectPath);
        process.chdir(projectPath);

        const packageName = projectName.replace(/-/g, "_");
        const groupId = "com.example";
        const springBootVersion = "3.4.4";
        const javaVersion = "21";
        // Spring Initializr API parameters
        const params = {
            type: "maven-project",
            language: "java",
            bootVersion: springBootVersion,
            groupId: groupId,
            artifactId: projectName,
            name: projectName,
            description: `Spring Boot project for ${projectName}`,
            packageName: `${groupId}.${packageName}`,
            packaging: "jar",
            javaVersion: javaVersion,
            dependencies: "web,devtools",
        };

        const springBootUrl = new URL("https://start.spring.io/starter.zip");
        // Append parameters to the URL's search parameters
        Object.keys(params).forEach((key) => {
            springBootUrl.searchParams.append(key, params[key]);
        });

        console.log(`Downloading Spring Boot project from: ${springBootUrl}`);

        // Download the zip file
        return new Promise((resolve, reject) => {
            https.get(springBootUrl, (response) => {
                if (response.statusCode !== 200) {
                    reject(new Error(`Failed to download: ${response.statusCode} ${response.statusMessage}`));
                    return;
                }

                const fileStream = fs.createWriteStream(zipFilePath);
                response.pipe(fileStream);

                fileStream.on('finish', () => {
                    fileStream.close();
                    console.log(`Download completed. Extracting to ${projectPath}...`);

                    // Extract the zip file
                    extract(zipFilePath, { dir: projectPath })
                        .then(() => {
                            console.log('Extraction completed successfully');
                            // Clean up the zip file
                            fs.unlinkSync(zipFilePath);
                            console.log("Setting execute permissions for mvnw...");
                            execSync(`chmod +x ${projectPath}/mvnw`);
                            execSync(`./mvnw wrapper:wrapper`, {
                                cwd: projectPath,
                                stdio: "inherit",
                                env: { ...process.env, JAVA_HOME: javaHome },
                            });
                            console.log("\nSpringboot project created successfully!");
                            console.log("\nNext steps:");
                            console.log(`1. cd ${projectName}`);
                            console.log(`2. export JAVA_HOME=(which java)`);
                            console.log("3. `./mvnw spring-boot:run` to start the server");
                            console.log("4. Go to http://localhost:8080");
                            resolve();
                        })
                        .catch((err) => {
                            reject(new Error(`Failed to extract zip file: ${err.message}`));
                        });
                });
            }).on('error', (err) => {
                reject(new Error(`Failed to download: ${err.message}`));
            });
        });

    } catch (error) {
        console.error(`Error: Failed to create project directory ${projectName}`);
        console.error(error);
        process.exit(1);
    }
} 
