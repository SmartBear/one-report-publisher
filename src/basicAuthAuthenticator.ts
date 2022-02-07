import { Authenticate } from './types'

export function basicAuthAuthenticator(username: string, password: string): Authenticate {
  return () =>
    Promise.resolve({
      Authorization: `Basic ${Buffer.from(`${username}:${password}`, 'utf-8').toString('base64')}`,
    })
}
