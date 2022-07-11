import assert from 'assert'
import http from 'http'
import { AddressInfo } from 'net'

import { getAccessToken } from '../src/getAccessToken.js'
import { readStream } from '../src/readStream.js'

type ServerRequest = {
  url: string
  headers: http.IncomingHttpHeaders
  body: Buffer
}

type TestResponseBody = {
  accessToken: string
  refreshToken: string
}

describe('getAccessToken', () => {
  let serverRequests: ServerRequest[]
  let server: http.Server
  let port: number
  let serverLatency: number

  beforeEach(async () => {
    serverLatency = 0
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
            if (!req.headers.authorization) {
              res.statusCode = 401
              return res.end('You need to authenticate')
            } else if (req.headers.authorization === 'Bearer Refresh Token') {
              res.statusCode = 200
            }
            const responseBody: TestResponseBody = {
              refreshToken: 'New Refresh Token',
              accessToken: 'New Access Token',
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

  it('should throw an error if refresh token is invalid', async () => {
    await assert.rejects(getAccessToken(`http://localhost:${port}`, 'invalid Refresh Token'))
  })

  it.skip('should return access token if the refresh token is valid', async () => {
    const accessToken = await getAccessToken(`http://localhost:${port}`, 'Bearer Refresh Token')
    assert(accessToken)
  })
})
