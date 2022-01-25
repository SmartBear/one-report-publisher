import { Env } from '@cucumber/ci-environment'
import assert from 'node:assert'
import fs from 'node:fs'
import http from 'node:http'
import { AddressInfo } from 'node:net'
import { Readable } from 'node:stream'
import { promisify } from 'node:util'

import publish from '../src/publish.js'

const readFile = promisify(fs.readFile)
const lstat = promisify(fs.lstat)

type ReceivedRequest = {
  url: string
  headers: http.IncomingHttpHeaders
  body: Buffer
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

  it('publishes files from glob', async () => {
    const organizationId = '32C46057-0AB6-44E8-8944-0246E0BEA96F'

    const fakeEnv: Env = {
      GITHUB_SERVER_URL: 'https://github.com',
      GITHUB_REPOSITORY: 'SmartBear/one-report-publisher',
      GITHUB_RUN_ID: '154666429',
      GITHUB_SHA: 'f7d967d6d4f7adc1d6657bda88f4e976c879d74c',
      GITHUB_REF: 'refs/heads/main',
    }

    await publish(
      ['test/fixtures/*.{xml,json}'],
      organizationId,
      `http://localhost:${port}`,
      fakeEnv,
      () => ({})
    )
    // Then
    const expected: ReceivedRequest[] = [
      {
        url: `/api/organization/${organizationId}/executions`,
        headers: {
          'content-type': 'application/json',
          'content-length': String((await lstat('test/fixtures/cucumber.json')).size),
          connection: 'close',
          host: `localhost:${port}`,
          'onereport-sourcecontrol': 'https://github.com/SmartBear/one-report-publisher.git',
          'onereport-revision': 'f7d967d6d4f7adc1d6657bda88f4e976c879d74c',
          'onereport-branch': 'main',
        },
        body: await readFile('test/fixtures/cucumber.json'),
      },
      {
        url: `/api/organization/${organizationId}/executions`,
        headers: {
          'content-type': 'text/xml',
          'content-length': String((await lstat('test/fixtures/junit.xml')).size),
          connection: 'close',
          host: `localhost:${port}`,
          'onereport-sourcecontrol': 'https://github.com/SmartBear/one-report-publisher.git',
          'onereport-revision': 'f7d967d6d4f7adc1d6657bda88f4e976c879d74c',
          'onereport-branch': 'main',
        },
        body: await readFile('test/fixtures/junit.xml'),
      },
    ]
    assert.deepStrictEqual(receivedRequests, expected)
  })
})
