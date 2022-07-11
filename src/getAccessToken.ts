import http from 'http'
import https from 'https'

import { readStream } from './readStream.js'

export async function getAccessToken(
  baseUrl: string,
  refreshToken: string,
  requestTimeout?: number
): Promise<string> {
  const headers: http.OutgoingHttpHeaders = {
    Authorization: `Bearer ${refreshToken}`,
  }
  const url = new URL(`/api/refresh-access-token`, baseUrl)

  return new Promise<string>((resolve, reject) => {
    let h: typeof http | typeof https
    switch (url.protocol) {
      case 'http:':
        h = http
        break
      case 'https:':
        h = https
        break
      default:
        return reject(new Error(`Unsupported protocol: ${url.toString()}`))
    }

    const req = h.request(
      url.toString(),
      {
        method: 'POST',
        headers,
      },
      (res) => {
        if (res.statusCode !== 201) {
          return reject(new Error(`Invalid refresh token`))
        } else {
          readStream(res)
            .then((buffer) => buffer.toString('utf-8'))
            .then((body) => {
              const ob = JSON.parse(body)
              resolve(ob.accessToken)
            })
        }
      }
    )
    if (requestTimeout) {
      req.setTimeout(requestTimeout)
    }
    req.on('error', reject)
    req.on('timeout', () =>
      reject(new Error(`request to ${url.toString()} timed out after ${requestTimeout}ms`))
    )
    req.end()
  })
}
