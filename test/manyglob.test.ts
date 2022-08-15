import assert from 'assert'
import fs from 'fs'
import * as os from 'os'
import { join, normalize } from 'path'
import { promisify } from 'util'

import { manyglob } from '../src/manyglob.js'

const mkdir = promisify(fs.mkdir)
const writeFile = promisify(fs.writeFile)
const rm = promisify(fs.rm)

describe('manyglob', () => {
  it('lists many files', async () => {
    const paths = (await manyglob(['test/fixtures/*.zip', 'test/fixtures/*.ndjson'])).slice().sort()
    assert.deepStrictEqual(paths, ['test/fixtures/bundled.zip', 'test/fixtures/cucumber.ndjson'])
  })

  it.only('expands ~ to home dir', async () => {
    const tmp = 'one-report-publisher-test-' + Date.now()
    const homeTmp = join(os.homedir(), tmp)
    try {
      await mkdir(homeTmp, { recursive: true })
      const wanted = join(homeTmp, 'file.txt')
      await writeFile(wanted, '')
      console.log(wanted, 'Wanted')
      const paths = await manyglob([`~/${tmp}/*.txt`])
      const normalizedPaths = paths.map(normalize)
      assert.deepStrictEqual(normalizedPaths, [wanted])
    } finally {
      await rm(homeTmp, { recursive: true })
    }
  })
})
