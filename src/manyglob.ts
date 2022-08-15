import fg from 'fast-glob'
import * as os from 'os'
import path from 'path'
const normalize = path.normalize

export async function manyglob(globs: readonly string[]): Promise<readonly string[]> {
  const globPaths = (
    await Promise.all(
      globs.reduce<readonly Promise<string[]>[]>((prev, glob) => {
        return prev.concat(fg(normalize(glob.replace(/^~/, os.homedir()))))
      }, [])
    )
  ).flatMap((paths) => paths)
  console.log(globPaths, 'globPaths', globs, 'globs')
  return globPaths
}
