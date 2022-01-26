import core from '@actions/core'
import { OneReportResponseBody, publish, vercelAuthenticator } from 'src/index.js'
import { URL } from 'url'

async function main() {
  const organizationId = core.getInput('organization-id')
  const password = core.getInput('password')
  const globs = core.getMultilineInput('reports')
  const baseUrl = core.getInput('url')

  const responseBodies = await publish<OneReportResponseBody>(
    globs,
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
    // Set report URLs as output, in case someone wants to do something special with them
    core.setOutput('report-urls', reportUrls)

    // Also print each URL, for convenience
    core.startGroup('Report URLs')
    for (const reportUrl of reportUrls) {
      core.info(reportUrl)
    }
    core.endGroup()
  })
  .catch((error) => core.setFailed(error.message))
