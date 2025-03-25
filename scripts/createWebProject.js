import fs from 'fs';
import createAngularProject from './web/angular/createAngularProject.js';
import createAstroProject from './web/astro/createAstroProject.js';
import createReactProject from './web/react/createReactProject.js';
import createVueProject from './web/vue/createVueProject.js';
import createSvelteProject from './web/svelte/createSvelteProject.js';

const frameworks = {
    angular: {
        name: 'Angular',
        description: 'A TypeScript-based open-source web application framework',
        create: createAngularProject,
    },
    astro: {
        name: 'Astro',
        description: 'A modern static site builder with island architecture',
        create: createAstroProject,
    },
    react: {
        name: 'React',
        description: 'A JavaScript library for building user interfaces',
        create: createReactProject,
    },
    svelte: {
        name: 'Svelte',
        description: 'A modern JavaScript framework for building user interfaces',
        create: createSvelteProject,
    },
    vue: {
        name: 'Vue',
        description: 'A progressive JavaScript framework for building user interfaces',
        create: createVueProject,
    },
};

function displayFrameworks() {
    console.log('\nAvailable frameworks:');
    Object.entries(frameworks).forEach(([key, framework]) => {
        console.log(`  ${key.padEnd(10)} - ${framework.name}`);
        console.log(`            ${framework.description}`);
    });
}

function validateFramework(framework) {
    if (!frameworks[framework]) {
        console.error(`Invalid framework: ${framework}`);
        displayFrameworks();
        process.exit(1);
    }
}

function validateProjectName(name) {
    if (!name) {
        console.error('Please provide a project name');
        process.exit(1);
    }

    // Check if directory already exists
    if (fs.existsSync(name)) {
        console.error(`Directory ${name} already exists`);
        process.exit(1);
    }

    // Check if name is a valid npm package name
    if (!/^[a-z0-9-]+$/.test(name)) {
        console.error('Project name must be lowercase and can only contain letters, numbers, and hyphens');
        process.exit(1);
    }
}

export default async function createWebProject({ framework, projectName }) {
    try {
        // Validate inputs
        validateFramework(framework);
        validateProjectName(projectName);

        // Create project
        await frameworks[framework].create({ projectName });
    } catch (error) {
        console.error('Error creating web project:', error);
        process.exit(1);
    }
}

// If running directly (not imported as a module)
if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.error('Usage: node createWebProject.js <framework> <project-name>');
        displayFrameworks();
        process.exit(1);
    }

    const [framework, projectName] = args;
    createWebProject({ framework, projectName });
}