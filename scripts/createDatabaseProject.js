import createOracleProject from './database/createOracleProject.js';
import createMongoDBProject from './database/createMongoDBProject.js';
import createMariaDBProject from './database/createMariaDBProject.js';
import createPostgreSQLProject from './database/createPostgreSQLProject.js';

export default async function ({ technology, projectName }) {
    console.log(`Creating a database project using ${technology}...`);
    console.log(`Project name: ${projectName}`);

    switch (technology) {
        case 'oracle':
            await createOracleProject({ projectName });
            break;
        case 'mongodb':
            await createMongoDBProject({ projectName });
            break;
        case 'mariadb':
            await createMariaDBProject({ projectName });
            break;
        case 'postgresql':
            await createPostgreSQLProject({ projectName });
            break;
        default:
            console.error('Unknown technology selected.');
    }
}