module.exports = {
  loader: 'ts-node/esm',
  extension: ['ts'],
  recursive: true,
  timeout: 10000,
  // Write JUnit XML report when we're running in CI
  // ...(process.env.CI
  //   ? {
  //       reporter: 'mocha-junit-reporter',
  //       'reporter-option': `mochaFile=./tmp/tests/junit-${Date.now()}.xml`,
  //     }
  //   : {}),
}
