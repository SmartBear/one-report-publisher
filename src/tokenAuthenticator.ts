import { Authenticate } from './types'

export function tokenAuthenticator(token: string): Authenticate {
  return () => ({
    Authorization: `Bearer ${token}`,
  })
}
