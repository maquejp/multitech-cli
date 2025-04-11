/**
 * Database technologies index file
 * This file exports all the database technology-specific functions
 */

import { createMariaDBProject } from './mariadb.js';
import { createMongoDBProject } from './mongodb.js';
import { createOracleProject } from './oracle.js';
import { createPostgreSQLProject } from './postgresql.js';

export const databaseTechnologies = {
    mariadb: createMariaDBProject,
    mongodb: createMongoDBProject,
    oracle: createOracleProject,
    postgresql: createPostgreSQLProject
}; 