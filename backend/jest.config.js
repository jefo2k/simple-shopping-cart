module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  testMatch: [ "**/test/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ]
};