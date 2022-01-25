import assert from 'assert'
import fs from 'fs'
import {promisify} from 'util'
import * as http from 'http'
import { AddressInfo } from 'net'

const readFile = promisify(fs.readFile)

type ReceivedRequest = {
  uri: string
  content: Buffer
  mediaType: string
}

export default async function publish(paths: readonly string[], organizationId: string, baseUrl: string) {
  const url = new URL( `/api/organization/${encodeURIComponent(organizationId)}/executions`, baseUrl).toString()

  return new Promise<void>((resolve, reject) => {
    const req = http.request(url, {
      method: 'POST',
      },
      (res) => {
        if (res.statusCode !== 201) { return reject(new Error(`Unexpected status code ${res.statusCode}`)) }
        return resolve()
      })

    req.on('error', reject)
    req.end()
  })
}

describe('publish',  () => {
  let server: http.Server
  let port: number

  beforeEach(async () => {
    port = await new Promise<number>(resolve => {
      server = http.createServer((req, res) => {
        res.statusCode = 201
        res.end()
      })
      server.listen(0, () => {
        resolve((server.address() as AddressInfo).port)
      })
    })
  })

  afterEach(async () => {
    return new Promise((resolve) => {
      server.on('close', resolve)
      server.close()
    })
  })

  it('publishes junit.xml files', async() => {
    const receivedRequests: ReceivedRequest[] = []
    const organizationId = '32C46057-0AB6-44E8-8944-0246E0BEA96F'

    await publish(
      ['test/fixtures/simple.xml'],
      organizationId,
      `http://localhost:${port}`
    )
    // Then
    const expected: ReceivedRequest[] = [{
      uri: `/api/organizations/${organizationId}/executions`,
      content: await readFile('test/fixtures/simple.xml'),
      mediaType: 'text/xml'
    }]
    assert.deepStrictEqual(receivedRequests, expected)
  })
})
