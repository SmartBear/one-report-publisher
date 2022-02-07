import https from 'https'

import { basicAuthAuthenticator } from '../src/basicAuthAuthenticator.js'

describe('basicAuthAuthenticator', () => {
  it('does not return 401 if authentication is successful', async () => {
    if (!process.env.ONE_REPORT_PASSWORD) {
      console.error(
        'WARNING - not testing basicAuthAuthenticator. Set ONE_REPORT_PASSWORD to test it'
      )
      return
    }

    const authenticate = basicAuthAuthenticator('anyone', process.env.ONE_REPORT_PASSWORD)

    const headers = await authenticate()
    const organizationId404 = '5EEAFB69-A37F-4758-B76F-391C4937E7B4'
    const revision404 = 'e40effa1848b3361127f8d91681184ccc77a68b0'
    const url = `https://one-report.vercel.app/api/organization/${organizationId404}/prioritization/${revision404}`
    await new Promise((resolve, reject) => {
      const req = https.request(
        url,
        {
          method: 'GET',
          headers,
        },
        (res) => {
          if (res.statusCode === 401) {
            reject(new Error('Authentication failed'))
          }
          resolve(res)
        }
      )
      req.on('error', reject)
      req.end()
    })
  })

  it('returns 401 if authentication is unsuccessful', async () => {
    const authenticate = basicAuthAuthenticator('anyone', 'bad-password')

    const headers = await authenticate()
    const organizationId404 = '5EEAFB69-A37F-4758-B76F-391C4937E7B4'
    const revision404 = 'e40effa1848b3361127f8d91681184ccc77a68b0'
    const url = `https://one-report.vercel.app/api/organization/${organizationId404}/prioritization/${revision404}`
    await new Promise((resolve, reject) => {
      const req = https.request(
        url,
        {
          method: 'GET',
          headers,
        },
        (res) => {
          if (res.statusCode === 401) {
            resolve(res)
          }
          reject(new Error('Expected Authentication to fail'))
        }
      )
      req.on('error', reject)
      req.end()
    })
  })
})
