import core from '@actions/core'

import {
  getAccessToken,
  OneReportResponseBody,
  publish,
  tokenAuthenticator,
} from '../../src/index.js'

const projectId = core.getInput('project-id') || process.env.ONE_REPORT_PROJECT_ID
const refreshToken = core.getInput('refresh-token') || process.env.ONE_REPORT_REFRESH_TOKEN
const baseUrl = core.getInput('url') || process.env.ONE_REPORT_URL
const globs = core.getMultilineInput('reports')
const maxTime = core.getInput('max-time')
const ignoreError = core.getBooleanInput('ignore-error')
const zip = core.getBooleanInput('zip')

async function main() {
  if (!projectId)
    throw new Error(
      "Please specify 'project-id' or define the ONE_REPORT_PROJECT_ID environment variable"
    )

  if (!refreshToken)
    throw new Error(
      "Please specify 'refresh-token' or define the ONE_REPORT_REFRESH_TOKEN environment variable"
    )

  if (!baseUrl)
    throw new Error("Please specify 'url' or define the ONE_REPORT_URL environment variable")

  const requestTimeout = maxTime ? +maxTime * 1000 : undefined
  const accessToken = await getAccessToken(baseUrl, refreshToken)

  const responseBodies = await publish<OneReportResponseBody>(
    globs,
    zip,
    projectId,
    baseUrl,
    process.env,
    tokenAuthenticator(accessToken),
    requestTimeout
  )

  return responseBodies.map((body) => body.testCycleId)
}

main()
  .then((testCycleIds) => {
    // Set test cycle ids as output, in case someone wants to do something special with them
    core.setOutput('test-cycle-ids', testCycleIds)

    // Also print each test cycle id, for convenience
    core.startGroup('Test Cycle Ids')
    for (const testCycleId of testCycleIds) {
      core.info(testCycleId)
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
