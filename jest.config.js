"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,ts}',
        '!**/node_modules/**',
        '!build/**',
        '!**/__mock__/**',
    ],
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ['/node_modules/', '/build/', '/src/cli.ts'],
    modulePathIgnorePatterns: ['node_modules'],
    preset: 'ts-jest',
    roots: ['<rootDir>/src'],
    testEnvironment: 'node',
    testMatch: [
        '**/?(*.)+(spec|test).[tj]s?(x)',
    ],
    testPathIgnorePatterns: ['/node_modules/'],
    transform: { '^.+\\.ts?$': 'ts-jest' },
};
