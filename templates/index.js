/**
 * Main templates index file
 * This file exports all category-specific functions
 */

import { webTechnologies } from './web/index.js';
import { backendTechnologies } from './backend/index.js';
import { mobileTechnologies } from './mobile/index.js';
import { databaseTechnologies } from './database/index.js';

export const technologies = {
    web: webTechnologies,
    backend: backendTechnologies,
    mobile: mobileTechnologies,
    database: databaseTechnologies
}; 