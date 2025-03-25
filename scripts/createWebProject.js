import createAngularProject from './web/angular/createAngularProject.js';
import createReactProject from './web/createReactProject.js';
import createAstroProject from './web/astro/createAstroProject.js';
import createVueProject from './web/createVueProject.js';

export default async function ({ technology, projectName }) {
    console.log(`Creating a web project using ${technology}...`);
    console.log(`Project name: ${projectName}`);

    switch (technology) {
        case 'angular':
            await createAngularProject({ projectName });
            break;
        case 'reactjs':
            await createReactProject({ projectName });
            break;
        case 'astro':
            await createAstroProject({ projectName });
            break;
        case 'vuejs':
            await createVueProject({ projectName });
            break;
        default:
            console.error('Unknown technology selected.');
    }
}