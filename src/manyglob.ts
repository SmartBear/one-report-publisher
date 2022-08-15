import fg from 'fast-glob'
import * as os from 'os'
import path from 'path'

const normalize = path.win32.normalize

export async function manyglob(globs: readonly string[]): Promise<readonly string[]> {
  return (
    await Promise.all(
      globs.reduce<readonly Promise<string[]>[]>((prev, glob) => {
        const path = normalize(glob.replace(/^~/, os.homedir()))
        console.log(path, 'this is the path')
        const globPath = fg(path)
        console.log(globPath, 'this is the globPath')
        return prev.concat(globPath)
      }, [])
    )
  ).flatMap((paths) => paths)
}
