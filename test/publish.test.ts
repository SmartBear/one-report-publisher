import assert from 'assert'
import fs from 'fs'
import { promisify } from 'util'
import http from 'http'
import { AddressInfo } from 'net'

const readFile = promisify(fs.readFile)

type ReceivedRequest = {
  url: string
  headers: http.IncomingHttpHeaders
  // content: Buffer
  // mediaType: string
}

export default async function publish(
  paths: readonly string[],
  organizationId: string,
  baseUrl: string
) {
  const url = new URL(
    `/api/organization/${encodeURIComponent(organizationId)}/executions`,
    baseUrl
  ).toString()

  return new Promise<void>((resolve, reject) => {
    const req = http.request(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml',
        },
      },
      (res) => {
        if (res.statusCode !== 201) {
          return reject(new Error(`Unexpected status code ${res.statusCode}`))
        }
        return resolve()
      }
    )

    req.on('error', reject)
    req.end()
  })
}

describe('publish', () => {
  let receivedRequests: ReceivedRequest[]
  let server: http.Server
  let port: number

  beforeEach(async () => {
    port = await new Promise<number>((resolve) => {
      server = http.createServer((req, res) => {
        assert(req.url)
        receivedRequests.push({
          url: req.url,
          headers: req.headers,
        })
        res.statusCode = 201
        res.end()
      })
      server.listen(0, () => {
        resolve((server.address() as AddressInfo).port)
      })
    })
    receivedRequests = []
  })

  afterEach(async () => {
    return new Promise((resolve) => {
      server.on('close', resolve)
      server.close()
    })
  })

  it('publishes junit.xml files', async () => {
    const organizationId = '32C46057-0AB6-44E8-8944-0246E0BEA96F'

    await publish(['test/fixtures/simple.xml'], organizationId, `http://localhost:${port}`)
    // Then
    const expected: ReceivedRequest[] = [
      {
        url: `/api/organization/${organizationId}/executions`,
        headers: {
          'content-type': 'text/xml',
          'content-length': '0',
          connection: 'close',
          host: `localhost:${port}`,
        },
        // content: await readFile('test/fixtures/simple.xml'),
        // mediaType: 'text/xml',
      },
    ]
    assert.deepStrictEqual(receivedRequests, expected)
  })
})
