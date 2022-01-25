import https from 'https'

import { Authenticate } from './types'

// See https://vercel.com/docs/errors#errors/bypassing-password-protection-programmatically
export function vercelAuthenticator(url: string, vercelPassword: string): Authenticate {
  return () =>
    new Promise((resolve, reject) => {
      const req = https.request(
        url,
        {
          method: 'POST',
        },
        (res) => {
          const setCookie = res.headers['set-cookie']
          if (!setCookie || setCookie.length === 0) return reject(new Error('No cookie'))
          const parts = setCookie[0].split(';').filter((s) => !!s.trim())
          if (parts.length === 0) return reject(new Error(`Bad cookie: ${setCookie[0]}`))
          const cookie = parts[0]
          return resolve({
            Cookie: cookie,
          })
        }
      )

      req.on('error', reject)
      req.write(`_vercel_password=${vercelPassword}`)
      req.end()
    })
}
