const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src/"],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    ...tsJestTransformCfg,
  },
  collectCoverageFrom: [
    'src/**/*.ts', 
    '!src/**/* .test.ts',
    '!src/**/index.ts',
    '!src/config/**',
    '!src/migration/**',
    '!src/seeds/**',
  ],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['ts', 'js', 'json'],
};