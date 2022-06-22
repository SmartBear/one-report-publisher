import core from '@actions/core'
import { URL } from 'url'

import { OneReportResponseBody, publish, tokenAuthenticator } from '../../src/index.js'

const organizationId = core.getInput('organization-id')
const token = core.getInput('token')
const globs = core.getMultilineInput('reports')
const maxTime = core.getInput('max-time')
const ignoreError = core.getBooleanInput('ignore-error')
const baseUrl = core.getInput('url')
const zip = core.getBooleanInput('zip')

async function main() {
  const requestTimeout = maxTime ? +maxTime * 1000 : undefined
  const responseBodies = await publish<OneReportResponseBody>(
    globs,
    zip,
    organizationId,
    baseUrl,
    process.env,
    tokenAuthenticator(token),
    requestTimeout
  )

  return responseBodies.map((body) =>
    new URL(`/organization/${organizationId}/test-cycles/${body.testCycleId}`, baseUrl).toString()
  )
}

main()
  .then((reportUrls) => {
    // Set report URLs as output, in case someone wants to do something special with them
    core.setOutput('report-urls', reportUrls)

    // Also print each URL, for convenience
    core.startGroup('Report URLs')
    for (const reportUrl of reportUrls) {
      core.info(reportUrl)
    }
    core.endGroup()
  })
  .catch((error) => {
    if (ignoreError) {
      core.info(error.message)
    } else {
      core.setFailed(error.message)
    }
  })
