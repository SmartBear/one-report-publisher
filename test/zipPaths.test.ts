// import { extname } from 'path'
import AdmZip from 'adm-zip'
import assert from 'assert'
import fs from 'fs'
import { basename, extname } from 'path'
import { promisify } from 'util'

import { manyglob } from '../src/manyglob.js'
import { zipPaths } from '../src/zipPaths.js'
const readFile = promisify(fs.readFile)

describe('zipPaths', () => {
  it('zips non .zip files into a temporary file', async () => {
    const paths = (await manyglob(['test/fixtures/*.{zip,ndjson,json,xml}'])).slice().sort()
    const zippedPaths = await zipPaths(paths)
    assert.strictEqual(zippedPaths.length, 2)

    const generatedZipPath = zippedPaths[0]
    const admZip = new AdmZip(await readFile(generatedZipPath))
    const entryNames = admZip
      .getEntries()
      .map((entry) => entry.entryName)
      .sort()

    const expected = paths
      .filter((path) => extname(path) !== '.zip')
      .map((path) => basename(path))
      .sort()

    assert.deepStrictEqual(entryNames, expected)
  })
})
