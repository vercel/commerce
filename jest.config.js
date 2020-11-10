module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts(x)?'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  modulePaths: ['<rootDir>/src/', '<rootDir>/.jest'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '@assets/(.*)$':['<rootDir>/assets/$1'],
    "@components/(.*)$": '<rootDir>/components/$1',
    '@config/(.*)$':['<rootDir>/config/$1'],
    '@lib/(.*)$':['<rootDir>/lib/$1'],
  },
}
