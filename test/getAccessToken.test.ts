import assert from 'assert'
import http from 'http'
import { AddressInfo } from 'net'

import { getAccessToken } from '../src/getAccessToken.js'

// type TestResponseBody = {
//   accessToken: string
//   refreshToken: string
// }

describe('getAccessToken', () => {
  let server: http.Server
  let port: number
  let responseDate: string

  beforeEach(async () => {
    responseDate = new Date(Date.now() - 1000).toUTCString()
    port = await new Promise<number>((resolve) => {
      server = http.createServer((req, res) => {
        res.setHeader('Date', responseDate)
        if (!req.headers.authorization) {
          res.statusCode = 401
          res.end('Missing authorization header')
        } else if (req.headers.authorization === 'Bearer valid-refresh-token') {
          res.statusCode = 201
          res.end(JSON.stringify({ accessToken: 'the-access-token' }))
        } else {
          res.statusCode = 400
          res.end('Invalid refresh token')
        }
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

  it('should throw an error if refresh token is invalid', async () => {
    await assert.rejects(getAccessToken(`http://localhost:${port}`, 'invalid-refresh-token'), {
      message: `Unexpected status code 400
POST http://localhost:${port}/api/refresh-access-token 
> Authorization: Bearer invalid-refresh-token

< date: ${responseDate}
< connection: close
< content-length: 21

Invalid refresh token
`,
    })
  })

  it('should return access token if the refresh token is valid', async () => {
    const accessToken = await getAccessToken(`http://localhost:${port}`, 'valid-refresh-token')
    assert(accessToken)
  })
})
