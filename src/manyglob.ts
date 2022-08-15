import fg from 'fast-glob'
import * as os from 'os'
import path from 'path'

export async function manyglob(globs: readonly string[]): Promise<readonly string[]> {
  return (
    await Promise.all(
      globs.reduce<readonly Promise<string[]>[]>((prev, glob) => {
        console.log(glob, 'this is the glob')
        const homeDir = os.homedir().split(path.sep).join(path.posix.sep)
        const globWithHomeDirExpanded = glob.replace(/^~/, homeDir)
        console.log(globWithHomeDirExpanded, 'this is the glob with homedir expanded')
        const foundPaths = fg(globWithHomeDirExpanded)
        console.log(foundPaths, 'this is the found paths')
        return prev.concat(foundPaths)
      }, [])
    )
  ).flatMap((paths) => paths)
}
