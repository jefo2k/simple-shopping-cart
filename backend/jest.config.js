module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    // '!<rootDir>/src/main/**',
    // '!<rootDir>/src/**/*-ports.ts',
    '!**/ports/**',
    '!**/test/**',
    '!**/config/**'
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}