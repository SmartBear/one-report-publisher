#!/usr/bin/env node
import { Command } from 'commander'
import { URL } from 'url'

import { OneReportResponseBody, publish, vercelAuthenticator } from '../../src/index.js'

const program = new Command()
program.requiredOption('-o, --organization-id <id>', 'OneReport organization id')
program.requiredOption('-p, --password <password>', 'OneReport password')
program.requiredOption('-r, --reports <glob...>', 'Glob to the files to publish')
program.option('-u, --url <url>', 'OneReport URL', 'https://one-report.vercel.app')
program.option('--no-zip', 'Do not zip non .zip files', false)

async function main() {
  program.parse(process.argv)
  const { organizationId, password, reports: globs, url: baseUrl, noZip } = program.opts()

  const responseBodies = await publish<OneReportResponseBody>(
    globs,
    !noZip,
    organizationId,
    baseUrl,
    process.env,
    vercelAuthenticator(baseUrl, password)
  )

  return responseBodies.map((body) =>
    new URL(
      `/organization/${organizationId}/executions/${body.testSetExecutionId}`,
      baseUrl
    ).toString()
  )
}

main()
  .then((reportUrls) => {
    console.log('Report URLs')
    for (const reportUrl of reportUrls) {
      console.log(`- ${reportUrl}`)
    }
  })
  .catch((error) => {
    console.error(error.stack)
    process.exit(1)
  })
