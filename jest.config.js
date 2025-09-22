/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  modulePaths: ['node_modules', '<rootDir>', '<rootDir>/src'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: {
    '\\.(css|less|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
    '^chroma-js$': '<rootDir>/src/__mocks__/chromaMock.ts',
  },
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(mui-color-input|@mui|@emotion)/)'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/__mocks__/setupTests.js'],
  globals: {
    PACKAGE_VERSION: JSON.stringify(require("./package.json").version),
  },
};
