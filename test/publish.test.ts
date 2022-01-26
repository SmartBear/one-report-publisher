import { Env } from '@cucumber/ci-environment'
import assert from 'assert'
import fs from 'fs'
import http from 'http'
import { AddressInfo } from 'net'
import { promisify } from 'util'

import { publish } from '../src/index.js'
import { readStream } from '../src/readStream.js'

const readFile = promisify(fs.readFile)
const lstat = promisify(fs.lstat)

type ServerRequest = {
  url: string
  headers: http.IncomingHttpHeaders
  body: Buffer
}

type TestResponseBody = {
  hello: string
}

describe('publish', () => {
  let serverRequests: ServerRequest[]
  let server: http.Server
  let port: number

  beforeEach(async () => {
    port = await new Promise<number>((resolve) => {
      server = http.createServer((req, res) => {
        readStream(req)
          .then((body) => {
            assert(req.url)
            serverRequests.push({
              url: req.url,
              headers: req.headers,
              body,
            })
            res.statusCode = 201
            const responseBody: TestResponseBody = {
              hello: 'world',
            }
            res.end(JSON.stringify(responseBody))
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
    serverRequests = []
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

    const responseBodies = await publish<TestResponseBody>(
      ['test/fixtures/*.{xml,json,ndjson,zip}'],
      organizationId,
      `http://localhost:${port}`,
      fakeEnv,
      () => Promise.resolve({})
    )
    const expectedServerRequests: ServerRequest[] = [
      {
        url: `/api/organization/${organizationId}/execution`,
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
        url: `/api/organization/${organizationId}/execution`,
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
      {
        url: `/api/organization/${organizationId}/execution`,
        headers: {
          'content-type': 'application/x-ndjson',
          'content-length': String((await lstat('test/fixtures/cucumber.ndjson')).size),
          connection: 'close',
          host: `localhost:${port}`,
          'onereport-sourcecontrol': 'https://github.com/SmartBear/one-report-publisher.git',
          'onereport-revision': 'f7d967d6d4f7adc1d6657bda88f4e976c879d74c',
          'onereport-branch': 'main',
        },
        body: await readFile('test/fixtures/cucumber.ndjson'),
      },
      {
        url: `/api/organization/${organizationId}/execution`,
        headers: {
          'content-type': 'application/zip',
          'content-length': String((await lstat('test/fixtures/bundled.zip')).size),
          connection: 'close',
          host: `localhost:${port}`,
          'onereport-sourcecontrol': 'https://github.com/SmartBear/one-report-publisher.git',
          'onereport-revision': 'f7d967d6d4f7adc1d6657bda88f4e976c879d74c',
          'onereport-branch': 'main',
        },
        body: await readFile('test/fixtures/bundled.zip'),
      },
    ]
    // Requests are sent in parallel, so we don't know what request hit the server first.
    const sortByContentType = (a: ServerRequest, b: ServerRequest) =>
      a.headers['content-type']!.localeCompare(b.headers['content-type']!)
    const sortedServerRequests = serverRequests.sort(sortByContentType)
    const sortedExpectedServerRequests = expectedServerRequests.sort(sortByContentType)

    assert.deepStrictEqual(sortedServerRequests, sortedExpectedServerRequests)

    const expectedResponseBodies: TestResponseBody[] = [
      {
        hello: 'world',
      },
      {
        hello: 'world',
      },
      {
        hello: 'world',
      },
      {
        hello: 'world',
      },
    ]

    assert.deepStrictEqual(responseBodies, expectedResponseBodies)
  })
})
