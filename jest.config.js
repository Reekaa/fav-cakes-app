export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      "^src/(.*)$": "<rootDir>/src/$1"
    },
    testPathIgnorePatterns: ['/node_modules/', '/build/'],
  };
  