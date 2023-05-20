module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/source'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',
  moduleFileExtensions: ['js', 'json', 'node'],
};
