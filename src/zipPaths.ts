import AdmZip from 'adm-zip'
import fs from 'fs'
import * as os from 'os'
import { basename, extname, join, sep } from 'path'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const mkdtemp = promisify(fs.mkdtemp)
const realpath = promisify(fs.realpath)
const rm = promisify(fs.rm)

export async function zipPaths(paths: readonly string[]): Promise<readonly string[]> {
  const nonZips = paths.filter((path) => extname(path) !== '.zip')
  const zips = paths.filter((path) => extname(path) === '.zip')

  const admZip = new AdmZip()

  for (const nonZip of nonZips) {
    const content = await readFile(nonZip)
    const name = basename(nonZip)
    // Not using zip.addLocalFile because it is synchronous
    admZip.addFile(name, content)
  }
  const resultPaths: string[] = []
  await withTempFile(
    'one-report-publisher.zip',
    (zipPath) => {
      resultPaths.push(zipPath)
      return writeFile(zipPath, admZip.toBuffer())
    },
    false
  )
  return resultPaths.concat(zips)
}

// https://advancedweb.hu/secure-tempfiles-in-nodejs-without-dependencies/

const withTempFile = (baseName: string, fn: (fileName: string) => Promise<void>, remove: boolean) =>
  withTempDir((dir) => fn(join(dir, baseName)), remove)

async function withTempDir(fn: (dirName: string) => Promise<void>, remove: boolean) {
  const dir = await mkdtemp((await realpath(os.tmpdir())) + sep)
  try {
    await fn(dir)
  } finally {
    if (remove) {
      await rm(dir, { recursive: true })
    }
  }
}
