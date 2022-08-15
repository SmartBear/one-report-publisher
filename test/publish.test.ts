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
  let serverLatency: number
  let responseDate: string

  beforeEach(async () => {
    serverLatency = 0
    responseDate = new Date(Date.now() - 1000).toUTCString()
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
            res.setHeader('Date', responseDate)
            if (!req.headers.authorization) {
              res.statusCode = 401
              return res.end('You need to authenticate')
            } else {
              res.statusCode = 201
            }
            const responseBody: TestResponseBody = {
              hello: 'world',
            }
            setTimeout(() => res.end(JSON.stringify(responseBody)), serverLatency)
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

  it('times out after specified timeout', async () => {
    serverLatency = 10
    const projectId = '32C46057-0AB6-44E8-8944-0246E0BEA96F'

    const fakeEnv: Env = {
      GITHUB_SERVER_URL: 'https://github.com',
      GITHUB_REPOSITORY: 'SmartBear/one-report-publisher',
      GITHUB_RUN_ID: '154666429',
      GITHUB_SHA: 'f7d967d6d4f7adc1d6657bda88f4e976c879d74c',
      GITHUB_REF: 'refs/heads/main',
    }

    await assert.rejects(
      publish<TestResponseBody>(
        ['test/fixtures/*.xml'],
        false,
        projectId,
        `http://localhost:${port}`,
        fakeEnv,
        () => ({}),
        1
      )
    )
  })

  it('publishes files from glob without zipping', async () => {
    const projectId = '32C46057-0AB6-44E8-8944-0246E0BEA96F'

    const fakeEnv: Env = {
      GITHUB_SERVER_URL: 'https://github.com',
      GITHUB_REPOSITORY: 'SmartBear/one-report-publisher',
      GITHUB_RUN_ID: '154666429',
      GITHUB_SHA: 'f7d967d6d4f7adc1d6657bda88f4e976c879d74c',
      GITHUB_HEAD_REF: 'main',
    }

    const responseBodies = await publish<TestResponseBody>(
      ['test/fixtures/*.{xml,json,ndjson,zip}'],
      false,
      projectId,
      `http://localhost:${port}`,
      fakeEnv,
      () => ({ Authorization: 'Bearer goodToken' }),
      undefined
    )
    const expectedServerRequests: ServerRequest[] = [
      {
        url: `/api/project/${projectId}/cucumber-json`,
        headers: {
          'content-type': 'application/json',
          'content-length': String((await lstat('test/fixtures/cucumber.json')).size),
          connection: 'close',
          host: `localhost:${port}`,
          'onereport-sourcecontrol': 'https://github.com/SmartBear/one-report-publisher.git',
          'onereport-revision': 'f7d967d6d4f7adc1d6657bda88f4e976c879d74c',
          'onereport-branch': 'main',
          authorization: 'Bearer goodToken',
        },
        body: await readFile('test/fixtures/cucumber.json'),
      },
      {
        url: `/api/project/${projectId}/junit-xml`,
        headers: {
          'content-type': 'text/xml',
          'content-length': String((await lstat('test/fixtures/junit.xml')).size),
          connection: 'close',
          host: `localhost:${port}`,
          'onereport-sourcecontrol': 'https://github.com/SmartBear/one-report-publisher.git',
          'onereport-revision': 'f7d967d6d4f7adc1d6657bda88f4e976c879d74c',
          'onereport-branch': 'main',
          authorization: 'Bearer goodToken',
        },
        body: await readFile('test/fixtures/junit.xml'),
      },
      {
        url: `/api/project/${projectId}/cucumber-messages`,
        headers: {
          'content-type': 'application/x-ndjson',
          'content-length': String((await lstat('test/fixtures/cucumber.ndjson')).size),
          connection: 'close',
          host: `localhost:${port}`,
          'onereport-sourcecontrol': 'https://github.com/SmartBear/one-report-publisher.git',
          'onereport-revision': 'f7d967d6d4f7adc1d6657bda88f4e976c879d74c',
          'onereport-branch': 'main',
          authorization: 'Bearer goodToken',
        },
        body: await readFile('test/fixtures/cucumber.ndjson'),
      },
      {
        url: `/api/project/${projectId}/zip`,
        headers: {
          'content-type': 'application/zip',
          'content-length': String((await lstat('test/fixtures/bundled.zip')).size),
          connection: 'close',
          host: `localhost:${port}`,
          'onereport-sourcecontrol': 'https://github.com/SmartBear/one-report-publisher.git',
          'onereport-revision': 'f7d967d6d4f7adc1d6657bda88f4e976c879d74c',
          'onereport-branch': 'main',
          authorization: 'Bearer goodToken',
        },
        body: await readFile('test/fixtures/bundled.zip'),
      },
    ]
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

  it('publishes files from glob with zipping', async () => {
    const projectId = '32C46057-0AB6-44E8-8944-0246E0BEA96F'

    const fakeEnv: Env = {}

    const responseBodies = await publish<TestResponseBody>(
      ['test/fixtures/*.{xml,json,ndjson,zip}'],
      true,
      projectId,
      `http://localhost:${port}`,
      fakeEnv,
      () => ({ Authorization: 'Bearer goodToken' }),
      undefined
    )
    const expectedServerRequests: Omit<ServerRequest, 'body'>[] = [
      {
        url: `/api/project/${projectId}/zip`,
        headers: {
          'content-type': 'application/zip',
          connection: 'close',
          host: `localhost:${port}`,
          authorization: 'Bearer goodToken',
        },
      },
      {
        url: `/api/project/${projectId}/zip`,
        headers: {
          'content-type': 'application/zip',
          connection: 'close',
          host: `localhost:${port}`,
          authorization: 'Bearer goodToken',
        },
      },
    ]
    const sortedServerRequests: Omit<ServerRequest, 'body'>[] = serverRequests
      .sort(sortByContentType)
      .map((req) => {
        const headers = JSON.parse(JSON.stringify(req.headers))
        delete headers['content-length']
        return {
          url: req.url,
          headers,
        }
      })
    const sortedExpectedServerRequests = expectedServerRequests.sort(sortByContentType)

    assert.deepStrictEqual(sortedServerRequests, sortedExpectedServerRequests)

    const expectedResponseBodies: TestResponseBody[] = [
      {
        hello: 'world',
      },
      {
        hello: 'world',
      },
    ]

    assert.deepStrictEqual(responseBodies, expectedResponseBodies)
  })

  it('prints response headers if response is not 201', async () => {
    const projectId = '32C46057-0AB6-44E8-8944-0246E0BEA96F'

    const fakeEnv: Env = {
      GITHUB_SERVER_URL: 'https://github.com',
      GITHUB_REPOSITORY: 'SmartBear/one-report-publisher',
      GITHUB_RUN_ID: '154666429',
      GITHUB_SHA: 'f7d967d6d4f7adc1d6657bda88f4e976c879d74c',
      GITHUB_HEAD_REF: 'main',
    }
    await assert.rejects(
      () =>
        publish<TestResponseBody>(
          ['test/fixtures/*.xml'],
          false,
          projectId,
          `http://localhost:${port}`,
          fakeEnv,
          () => ({}),
          undefined
        ),
      {
        message: `Unexpected status code 401
POST http://localhost:${port}/api/project/32C46057-0AB6-44E8-8944-0246E0BEA96F/junit-xml -d @test/fixtures/junit.xml
> Content-Type: text/xml
> Content-Length: 359
> OneReport-SourceControl: https://github.com/SmartBear/one-report-publisher.git
> OneReport-Revision: f7d967d6d4f7adc1d6657bda88f4e976c879d74c
> OneReport-Branch: main

< date: ${responseDate}
< connection: close
< content-length: 24

You need to authenticate
`,
      }
    )
  })
})

// Requests are sent in parallel, so we don't know what request hit the server first.
function sortByContentType(a: ServerRequest, b: ServerRequest) {
  return a.headers['content-type']!.localeCompare(b.headers['content-type']!)
}
