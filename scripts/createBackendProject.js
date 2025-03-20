import createAPIPlatformProject from './backend/createAPIPlatformProject.js';
import createExpressProject from './backend/createExpressProject.js';
import createSpringBootProject from './backend/createSpringBootProject.js';

export default async function ({ technology, projectName }) {
    console.log(`Creating a backend project using ${technology}...`);
    console.log(`Project name: ${projectName}`);

    switch (technology) {
        case 'api-platform':
            await createAPIPlatformProject({ projectName });
            break;
        case 'express':
            await createExpressProject({ projectName });
            break;
        case 'spring-boot':
            await createSpringBootProject({ projectName });
            break;
        default:
            console.error('Unknown technology selected.');
    }
}