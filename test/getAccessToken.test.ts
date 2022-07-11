import assert from 'assert'

import { getAccessToken } from '../src/getAccessToken.js'

describe('getAccessToken', () => {
  it.only('should throw an error if refresh token is invalid', async () => {
    await assert.rejects(getAccessToken('invalid Refresh Token'))
  })
  // it('should return access token if the refresh token is valid')
})
