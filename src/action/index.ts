import core from '@actions/core'
import { OneReportResponseBody, publish, vercelAuthenticator } from 'src/index.js'

async function main() {
  const organizationId = core.getInput('one-report-organization-id')
  const password = core.getInput('one-report-password')
  const globs = core.getMultilineInput('report-globs')
  const baseUrl = core.getInput('one-report-url')

  const responseBodies = await publish<OneReportResponseBody>(
    globs,
    organizationId,
    baseUrl,
    process.env,
    vercelAuthenticator(baseUrl, password)
  )

  return responseBodies.map(
    (body) =>
      new URL(`/organization/${organizationId}/executions/${body.testSetExecutionId}`, baseUrl)
        .toString
  )
}

main()
  .then((urls) => core.setOutput('report-urls', urls))
  .catch((error) => core.setFailed(error.message))
