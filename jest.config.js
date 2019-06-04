module.exports = {
  setupFilesAfterEnv: [
    '<rootDir>/testSetup.js',
    '<rootDir>/__mocks__/momentMock.js'
  ],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js'
  }
}
