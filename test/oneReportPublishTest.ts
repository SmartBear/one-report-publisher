import { publish, vercelAuthenticator } from '../src/index.js'

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
    await publish(
      ['test/fixtures/*.{xml,json}'],
      process.env.ONE_REPORT_ORGANIZATION_ID,
      baseUrl,
      process.env,
      vercelAuthenticator(baseUrl, process.env.ONE_REPORT_PASSWORD)
    )
  })
})
