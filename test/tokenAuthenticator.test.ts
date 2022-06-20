import https from 'https'

import { tokenAuthenticator } from '../src/tokenAuthenticator.js'

const oneReportUrl = new URL('https://fvkgiegbjr.us-east-2.awsapprunner.com')

describe('tokenAuthenticator', () => {
  it('does not return 401 if authentication is successful', async () => {
    if (!process.env.ONE_REPORT_TOKEN) {
      console.error('WARNING - not testing tokenAuthAuthenticator. Set ONE_REPORT_TOKEN to test it')
      return
    }

    const authenticate = tokenAuthenticator(process.env.ONE_REPORT_TOKEN)

    const headers = authenticate()
    const organizationId404 = '5EEAFB69-A37F-4758-B76F-391C4937E7B4'
    const url = new URL(
      `/api/organization/${encodeURIComponent(organizationId404)}/test-cycle`,
      oneReportUrl
    ).href
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

  it('returns 400 if token is invalid', async () => {
    const authenticate = tokenAuthenticator('not-a-valid-jwt')

    const headers = authenticate()
    const organizationId404 = '5EEAFB69-A37F-4758-B76F-391C4937E7B4'
    const url = new URL(
      `/api/organization/${encodeURIComponent(organizationId404)}/test-cycle`,
      oneReportUrl
    ).href
    await new Promise((resolve, reject) => {
      const req = https.request(
        url,
        {
          method: 'POST',
          headers,
        },
        (res) => {
          if (res.statusCode === 401) {
            resolve(res)
          }
          reject(new Error(`Expected Authentication to fail with 401, but got ${res.statusCode}`))
        }
      )
      req.on('error', reject)
      req.end()
    })
  })

  it('returns 401 if Authorization header is not supplied', async () => {
    const headers = {}
    const organizationId404 = '5EEAFB69-A37F-4758-B76F-391C4937E7B4'
    const url = new URL(
      `/api/organization/${encodeURIComponent(organizationId404)}/test-cycle`,
      oneReportUrl
    ).href
    await new Promise((resolve, reject) => {
      const req = https.request(
        url,
        {
          method: 'POST',
          headers,
        },
        (res) => {
          if (res.statusCode === 401) {
            resolve(res)
          }
          reject(new Error(`Expected Authentication to fail with 401, but got ${res.statusCode}`))
        }
      )
      req.on('error', reject)
      req.end()
    })
  })
})
