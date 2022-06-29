#!/usr/bin/env node
import { Command } from 'commander'
import { URL } from 'url'

import { OneReportResponseBody, publish, tokenAuthenticator } from '../../src/index.js'

const program = new Command()
program.requiredOption('-u, --url <url>', 'OneReport URL', process.env.ONE_REPORT_URL)
program.requiredOption(
  '-o, --organization <id>',
  'OneReport organization id',
  process.env.ONE_REPORT_ORGANIZATION
)
program.requiredOption('-t, --token <token>', 'OneReport token', process.env.ONE_REPORT_TOKEN)
program.requiredOption('-r, --reports <glob...>', 'Glob to the files to publish')
program.option('-m, --max-time <seconds>', 'Max time for each request')
program.option('-i, --ignore-error', 'Exit with 0 even if a timeout or error occurred')
program.option('--no-zip', 'Do not zip non .zip files', false)

program.parse(process.argv)
const {
  organization,
  token,
  reports: globs,
  maxTime,
  ignoreError,
  url: baseUrl,
  noZip,
} = program.opts()

async function main() {
  const requestTimeout = maxTime ? +maxTime * 1000 : undefined
  const responseBodies = await publish<OneReportResponseBody>(
    globs,
    !noZip,
    organization,
    baseUrl,
    process.env,
    tokenAuthenticator(token),
    requestTimeout
  )

  return responseBodies.map((body) =>
    new URL(`/organization/${organization}/test-cycles/${body.testCycleId}`, baseUrl).toString()
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
    if (ignoreError) {
      process.exit(0)
    } else {
      process.exit(1)
    }
  })
