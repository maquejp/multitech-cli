/**
 * Spring Boot project template
 * This is a dummy script that will be replaced with actual project generation logic
 */

export function createSpringBootProject(projectName) {
    const projectPath = path.join(process.cwd(), projectName);
    const templatePath = path.join(__dirname, 'templates', 'springboot');

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
        https.get(springBootUrl, (response) => {
            if (response.statusCode !== 200) {
                throw new Error(
                    `Failed to download Spring Boot project: ${response.statusMessage}`
                );
            }
            const zipFilePath = path.join(projectDir, "project.zip");
            const file = fs.createWriteStream(zipFilePath);
            response.pipe(file);
            console.log(`Downloaded Spring Boot project to: ${zipFilePath}`);
            file.on("finish", async () => {
                console.log("Unzipping project...");
                unzip(zipFilePath, projectDir, (err) => {
                    if (err) {
                        throw new Error(`Failed to unzip project: ${err}`);
                    }
                    console.log("Project unzipped successfully");
                    extract(zipFilePath, { dir: projectDir }).then(() => {
                        console.log("ZIP file extracted.");
                        fs.unlinkSync(zipFilePath);
                        console.log("Setting execute permissions for mvnw...");
                        execSync(`chmod +x ${projectDir}/mvnw`);
                        execSync(`./mvnw wrapper:wrapper`, {
                            cwd: projectDir,
                        });
                    });
                });

                console.log("\nSpringboot project created successfully!");
                console.log("\nNext steps:");
                console.log(`1. cd ${projectName}`);
                console.log(`2. export JAVA_HOME=(which java)`);
                console.log("3. `./mvnw spring-boot:run` to start the server");
                console.log("4. Go to http://localhost:8080");
                process.exit(0); // Exit the CLI after successful project creation
            });
        });
    } catch (error) {
        console.error(`Error: Failed to create project directory ${projectName}`);
        console.error(error);
        process.exit(1);
    }
} 
