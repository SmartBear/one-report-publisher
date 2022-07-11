import http from 'http'

export async function getAccessToken(baseUrl: string, refreshToken: string): Promise<string> {
  const authHeaders: http.OutgoingHttpHeaders = {
    Authorization: `Bearer ${refreshToken}`,
  }

  const url = new URL(`/api/refresh-access-token`, baseUrl)

  //   let h: typeof http | typeof https
  //   switch (url.protocol) {
  //     case 'http:':
  //       h = http
  //       break
  //     case 'https:':
  //       h = https
  //       break
  //     default:
  //       return reject(new Error(`Unsupported protocol: ${url.toString()}`))
  //   }
  //   const headers = {
  //     'Content-Type': contentTypes[extname(path) as Extension],
  //     'Content-Length': stat.size,
  //     ...(ciEnv?.git?.remote ? { 'OneReport-SourceControl': ciEnv.git.remote } : {}),
  //     ...(ciEnv?.git?.revision ? { 'OneReport-Revision': ciEnv.git.revision } : {}),
  //     ...(ciEnv?.git?.branch ? { 'OneReport-Branch': ciEnv.git.branch } : {}),
  //     ...(ciEnv?.git?.tag ? { 'OneReport-Tag': ciEnv.git.tag } : {}),
  //     ...authHeaders,
  //   }

  //   const req = h.request(
  //     url.toString(),
  //     {
  //       method: 'POST',
  //       headers,
  //     },
  //     (res) => {
  //       readStream(res)
  //         .then((buffer) => buffer.toString('utf-8'))
  //         .then((body) => {
  //           if (res.statusCode !== 201) {
  //             return reject(
  //               new Error(`Unexpected status code ${res.statusCode}
  // POST ${url.toString()} -d @${path}
  // > ${Object.entries(headers)
  //                 .map(([h, v]) => `${h}: ${v}`)
  //                 .join('\n> ')}

  // < ${Object.entries(res.headers)
  //                 .map(([h, v]) => `${h}: ${v}`)
  //                 .join('\n< ')}

  // ${body}
  // `)
  //             )
  //           } else {
  //             try {
  //               const responseBody = JSON.parse(body) as ResponseBody
  //               return resolve(responseBody)
  //             } catch (err) {
  //               reject(err)
  //             }
  //           }
  //         })
  //         .catch(reject)
  //     }
  //   )

  throw new Error('invalid token')
  // return 'access token'
}
