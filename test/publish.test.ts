import assert from 'assert'
import fs from 'fs'
import {promisify} from 'util'
import * as http from 'http'
import { AddressInfo } from 'net'

const readFile = promisify(fs.readFile)

type ReceivedFile = {
  content: Buffer
  mediaType: string
}

describe('publish',  () => {
  let server: http.Server
  let port: number

  beforeEach(async () => {
    port = await new Promise<number>(resolve => {
      server = http.createServer((req, res) => {
        res.statusCode = 201
        res.end()
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

  it('publishes junit.xml files', async() => {
    const receivedFiles: ReceivedFile[] = []

    // Given

    console.log({port})

    // When

    // Then
    const expected: ReceivedFile[] = [{
      content: await readFile('test/fixtures/simple.xml'),
      mediaType: 'text/xml'
    }]
    // assert.deepStrictEqual(receivedFiles, expected)
  })
})
