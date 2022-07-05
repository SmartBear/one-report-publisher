#!/usr/bin/env node
import { Command } from 'commander'

import { OneReportResponseBody, publish, tokenAuthenticator } from '../../src/index.js'

const program = new Command()
program.requiredOption(
  '-u, --url <url>',
  'OneReport URL. Defaults to $ONE_REPORT_URL',
  process.env.ONE_REPORT_URL
)
program.requiredOption(
  '-p, --project-id <id>',
  'OneReport project id. Defaults to $ONE_REPORT_PROJECT_ID',
  process.env.ONE_REPORT_PROJECT_ID
)
program.requiredOption(
  '-t, --token <token>',
  'OneReport token. Defaults to $ONE_REPORT_TOKEN',
  process.env.ONE_REPORT_TOKEN
)
program.requiredOption('-r, --reports <glob...>', 'Glob to the files to publish')
program.option('-m, --max-time <seconds>', 'Max time for each request')
program.option('-i, --ignore-error', 'Exit with 0 even if a timeout or error occurred')
program.option('--no-zip', 'Do not zip non .zip files', false)

program.parse(process.argv)
const {
  projectId,
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
    projectId,
    baseUrl,
    process.env,
    tokenAuthenticator(token),
    requestTimeout
  )

  return responseBodies.map((body) => body.testCycleId)
}

main()
  .then((testCycleIds) => {
    console.log('Test Cycle Ids')
    console.log(testCycleIds)
  })
  .catch((error) => {
    console.error(error.stack)
    if (ignoreError) {
      process.exit(0)
    } else {
      process.exit(1)
    }
  })
