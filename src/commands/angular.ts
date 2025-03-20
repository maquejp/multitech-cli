import { Command } from "commander";
import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

export const createAngularProject = new Command("angular")
  .description("Create a new Angular project with recommended setup")
  .argument("<name>", "Name of the project")
  .action(async (name: string) => {
    try {
      // 1. Initialize the project
      console.log("Creating new Angular project...");
      execSync(
        `ng new ${name} --style=css --ssr=false --routing=true --skip-git --skip-tests`,
        {
          stdio: "inherit",
        }
      );

      // 2. Setup TailwindCSS
      console.log("Setting up TailwindCSS...");
      const projectPath = path.join(process.cwd(), name);
      execSync("npm install -D tailwindcss postcss autoprefixer", {
        cwd: projectPath,
        stdio: "inherit",
      });
      execSync("npx tailwindcss init", { cwd: projectPath, stdio: "inherit" });

      // Configure TailwindCSS
      const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
      fs.writeFileSync(
        path.join(projectPath, "tailwind.config.js"),
        tailwindConfig
      );

      // Update styles.css
      const stylesPath = path.join(projectPath, "src/styles.css");
      const stylesContent = `@tailwind base;
@tailwind components;
@tailwind utilities;`;
      fs.writeFileSync(stylesPath, stylesContent);

      // 3. Create recommended folder structure
      const folders = [
        "src/app/core",
        "src/app/shared",
        "src/app/features",
        "src/app/layout",
        "src/assets/images",
        "src/assets/icons",
        "src/environments",
      ];

      folders.forEach((folder) => {
        fs.mkdirSync(path.join(projectPath, folder), { recursive: true });
      });

      // 4. Update app.component.ts with minimal implementation
      const appComponentPath = path.join(
        projectPath,
        "src/app/app.component.ts"
      );
      const appComponentContent = `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Welcome to ${name}</h1>
        <p class="text-gray-600">{{ currentDateTime }}</p>
      </div>
    </div>
  \`,
  styles: []
})
export class AppComponent {
  currentDateTime = new Date().toLocaleString();
}`;
      fs.writeFileSync(appComponentPath, appComponentContent);

      console.log("\nAngular project created successfully! 🎉");
      console.log(`\nNext steps:
1. cd ${name}
2. npm install
3. ng serve`);
    } catch (error) {
      console.error("Error creating Angular project:", error);
      process.exit(1);
    }
  });
