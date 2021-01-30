module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '\\.test\\.ts$',
  moduleFileExtensions: ['ts', 'js'],
  collectCoverage: true,
  testEnvironment: 'node',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  moduleNameMapper: {
    '^@src(.*)$': '<rootDir>/src$1',
  },
};
