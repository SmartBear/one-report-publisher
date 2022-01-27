import assert from 'assert'
import fs from 'fs'
import * as os from 'os'
import path from 'path'
import { promisify } from 'util'

import { manyglob } from '../src/manyglob.js'

const mkdir = promisify(fs.mkdir)
const writeFile = promisify(fs.writeFile)
const rmdir = promisify(fs.rmdir)

describe('manyglob', () => {
  it('lists many files', async () => {
    const paths = (await manyglob(['test/fixtures/*.zip', 'test/fixtures/*.ndjson'])).slice().sort()
    assert.deepStrictEqual(paths, ['test/fixtures/bundled.zip', 'test/fixtures/cucumber.ndjson'])
  })

  it('expands ~ to home dir', async () => {
    const tmp = 'one-report-publisher-test-' + Date.now()
    const homeTmp = path.join(os.homedir(), tmp)
    try {
      await mkdir(homeTmp, { recursive: true })
      const wanted = path.join(homeTmp, 'file.txt')
      await writeFile(wanted, '')
      const paths = await manyglob([`~/${tmp}/*.txt`])
      assert.deepStrictEqual(paths, [wanted])
    } finally {
      await rmdir(homeTmp, { recursive: true })
    }
  })
})
