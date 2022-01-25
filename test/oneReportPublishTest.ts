import assert from 'assert'

import { publish, vercelAuthenticator } from '../src/index.js'

type OneReportResponseBody = {
  testSetExecutionId: string
  reportId: string
}

describe('oneReportPublish', () => {
  it('publishes to one-report.vercel.app', async () => {
    if (!process.env.ONE_REPORT_ORGANIZATION_ID) {
      console.error(
        'WARNING - not testing OneReport publishing. Set ONE_REPORT_ORGANIZATION_ID to test it'
      )
      return
    }
    if (!process.env.ONE_REPORT_PASSWORD) {
      console.error(
        'WARNING - not testing OneReport publishing. Set ONE_REPORT_PASSWORD to test it'
      )
      return
    }

    const baseUrl = `https://one-report.vercel.app`
    const responseBodies = await publish<OneReportResponseBody>(
      ['test/fixtures/*.{xml,json}'],
      process.env.ONE_REPORT_ORGANIZATION_ID,
      baseUrl,
      process.env,
      vercelAuthenticator(baseUrl, process.env.ONE_REPORT_PASSWORD)
    )

    assert.strictEqual(responseBodies.length, 2)
    for (const responseBody of responseBodies) {
      assert(responseBody.testSetExecutionId)
      assert(responseBody.reportId)
    }
  })
})
