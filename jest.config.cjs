/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: { '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }] },
  moduleNameMapper: { '\\.(css|less|sass|scss)$': 'identity-obj-proxy' },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],
};