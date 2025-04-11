/**
 * Web technologies index file
 * This file exports all the web technology-specific functions
 */

import { createAngularProject } from './angular.js';
import { createAstroProject } from './astro.js';
import { createReactProject } from './react.js';
import { createSvelteProject } from './svelte.js';
import { createVueProject } from './vue.js';

export const webTechnologies = {
    angular: createAngularProject,
    astro: createAstroProject,
    react: createReactProject,
    svelte: createSvelteProject,
    vue: createVueProject
}; 