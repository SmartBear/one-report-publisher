import assert from 'assert'
import fs from 'fs'
import { promisify } from 'util'
import http from 'http'
import { AddressInfo } from 'net'
import { Readable, pipeline } from 'stream'

const readFile = promisify(fs.readFile)
const lstat = promisify(fs.lstat)

type ReceivedRequest = {
  url: string
  headers: http.IncomingHttpHeaders
  body: Buffer
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

  const stats = await lstat(paths[0])

  return new Promise<void>((resolve, reject) => {
    const req = http.request(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml',
          'Content-Length': stats.size,
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

    const file = fs.createReadStream(paths[0])

    pipeline(file, req, (err) => {
      try {
        if (err) return reject(err)
        resolve()
      } finally {
        req.end()
      }
    })
  })
}

async function readStream(req: Readable): Promise<Buffer> {
  const chunks = []
  for await (const chunk of req) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}

describe('publish', () => {
  let receivedRequests: ReceivedRequest[]
  let server: http.Server
  let port: number

  beforeEach(async () => {
    port = await new Promise<number>((resolve) => {
      server = http.createServer((req, res) => {
        readStream(req)
          .then((body) => {
            assert(req.url)
            receivedRequests.push({
              url: req.url,
              headers: req.headers,
              body,
            })
            res.statusCode = 201
            res.end()
          })
          .catch((err) => {
            res.statusCode = 500
            res.end(err.stack)
          })
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

    const stats = await lstat('test/fixtures/simple.xml')

    await publish(['test/fixtures/simple.xml'], organizationId, `http://localhost:${port}`)
    // Then
    const expected: ReceivedRequest[] = [
      {
        url: `/api/organization/${organizationId}/executions`,
        headers: {
          'content-type': 'text/xml',
          'content-length': String(stats.size),
          connection: 'close',
          host: `localhost:${port}`,
        },
        body: await readFile('test/fixtures/simple.xml'),
      },
    ]
    assert.deepStrictEqual(receivedRequests, expected)
  })
})
