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

  console.log('Response Bodies', responseBodies)

  return responseBodies.map(
    (body) =>
      new URL(`/organization/${organizationId}/executions/${body.testSetExecutionId}`, baseUrl)
        .toString
  )
}

main()
  .then((urls) => {
    core.setOutput('report-urls', urls)
  })
  .catch((error) => core.setFailed(error.message))
