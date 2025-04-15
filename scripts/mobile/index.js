/**
 * Mobile technologies index file
 * This file exports all the mobile technology-specific functions
 */

import { createFlutterProject } from './flutter.js';
import { createIonicProject } from './ionic.js';
import { createReactNativeProject } from './reactnative.js';

export const mobileTechnologies = {
    flutter: createFlutterProject,
    ionic: createIonicProject,
    reactnative: createReactNativeProject
}; 