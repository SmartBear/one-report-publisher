import assert from 'assert'

import { OneReportResponseBody, publish, tokenAuthenticator } from '../src/index.js'

describe('oneReportPublish', () => {
  it('publishes to production', async () => {
    if (!process.env.ONE_REPORT_TEST_ORGANIZATION_ID) {
      console.error(
        'WARNING - not testing OneReport publishing. Set ONE_REPORT_TEST_ORGANIZATION_ID to test it'
      )
      return
    }
    if (!process.env.ONE_REPORT_TOKEN) {
      console.error('WARNING - not testing OneReport publishing. Set ONE_REPORT_TOKEN to test it')
      return
    }
    if (!process.env.ONE_REPORT_URL) {
      console.error('WARNING - not testing OneReport publishing. Set ONE_REPORT_URL to test it')
      return
    }

    const oneReportUrl = process.env.ONE_REPORT_URL
    const responseBodies = await publish<OneReportResponseBody>(
      ['test/fixtures/*.{xml,json}'],
      true,
      process.env.ONE_REPORT_TEST_ORGANIZATION_ID,
      oneReportUrl,
      process.env,
      tokenAuthenticator(process.env.ONE_REPORT_TOKEN),
      undefined
    )

    assert.strictEqual(responseBodies.length, 2)
    for (const responseBody of responseBodies) {
      assert(responseBody.testCycleId)
    }
  })
})
