module.exports = {
  recursive: true,
  timeout: 5000,
  // Write JUnit XML report when we're running in CI
  ...(process.env.CI
    ? {
        reporter: 'mocha-junit-reporter',
        'reporter-option': `mochaFile=./tmp/tests/junit-${Date.now()}.xml`,
      }
    : {}),
}
