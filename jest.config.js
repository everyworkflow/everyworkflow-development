/*
 * @copyright EveryWorkflow. All rights reserved.
 */

const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');
const path = require('path');

const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths);
Object.keys(moduleNameMapper).map((key => {
    if (moduleNameMapper.hasOwnProperty(key)) {
        moduleNameMapper[key] = path.resolve(__dirname, moduleNameMapper[key]);
    }
}));

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: moduleNameMapper
};
