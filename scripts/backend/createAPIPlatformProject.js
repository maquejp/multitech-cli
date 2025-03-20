import fs from 'fs';
import path from 'path';

export default async function ({ projectName }) {
    console.log(`Creating an API Platform project named ${projectName}...`);

    const projectDir = path.join(process.cwd(), projectName);

    if (fs.existsSync(projectDir)) {
        console.error(`Error: Project directory "${projectDir}" already exists. Please choose a different name.`);
        return;
    }

    const templateDir = path.join(__dirname, 'templates', 'apiplatform');

    fs.mkdirSync(projectDir, { recursive: true });

    fs.readdirSync(templateDir).forEach(file => {
        const srcFile = path.join(templateDir, file);
        const destFile = path.join(projectDir, file);
        if (fs.existsSync(srcFile)) {
            fs.copyFileSync(srcFile, destFile);
            console.log(`Copied ${file} to ${projectDir}`);
        } else {
            console.error(`Source file "${srcFile}" does not exist.`);
        }
    });

    console.log(`API Platform project ${projectName} created successfully!`);
}