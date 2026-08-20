/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePaths: ['node_modules', '<rootDir>'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
};
