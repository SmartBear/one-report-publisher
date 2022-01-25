import assert from 'assert'

import { vercelAuthenticator } from '../src/index.js'

describe('vercelAuthenticator', () => {
  it('returns a jwt cookie when password is correct', async () => {
    if (!process.env.ONE_REPORT_PASSWORD) {
      console.error(
        'WARNING - not testing Vercel authenticator. Set ONE_REPORT_PASSWORD to test it'
      )
      return
    }

    const authenticate = vercelAuthenticator(
      'https://one-report.vercel.app/',
      process.env.ONE_REPORT_PASSWORD
    )

    const headers = await authenticate()
    const cookie = headers['Cookie'] as string
    if (!cookie) throw new Error('No cookie')
    if (!cookie.match(/^_vercel_jwt=.*/)) {
      throw new Error(`Bad cookie: ${cookie}`)
    }
  })

  it('returns no cookie when password is bad', async () => {
    await assert.rejects(vercelAuthenticator('https://one-report.vercel.app/', 'bad-password'))
  })
})
