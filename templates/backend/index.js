/**
 * Backend technologies index file
 * This file exports all the backend technology-specific functions
 */

import { createApiPlatformProject } from './apiplatform.js';
import { createExpressProject } from './express.js';
import { createSpringBootProject } from './springboot.js';

export const backendTechnologies = {
    apiplatform: createApiPlatformProject,
    express: createExpressProject,
    springboot: createSpringBootProject
}; 