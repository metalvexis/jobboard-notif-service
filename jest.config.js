/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: 'node',
  testMatch: [
    "**/__tests__/**/*.test.ts"
  ],
  roots: [
    "<rootDir>/src"
  ],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }]
  },
  transformIgnorePatterns: ['/node_modules/(?!string-width)', '/dist/'],
  extensionsToTreatAsEsm: ['.ts'],
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**"],
  coverageReporters: [['text', {skipFull: true}]],
};