import core from '@actions/core'

import { OneReportResponseBody, publish, tokenAuthenticator } from '../../src/index.js'

const projectId = core.getInput('project-id') || process.env.ONE_REPORT_PROJECT_ID
const token = core.getInput('token') || process.env.ONE_REPORT_TOKEN
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

  if (!token)
    throw new Error("Please specify 'token' or define the ONE_REPORT_TOKEN environment variable")

  if (!baseUrl)
    throw new Error("Please specify 'url' or define the ONE_REPORT_URL environment variable")

  const requestTimeout = maxTime ? +maxTime * 1000 : undefined
  const responseBodies = await publish<OneReportResponseBody>(
    globs,
    zip,
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
