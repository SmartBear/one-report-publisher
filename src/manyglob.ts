import fg from 'fast-glob'
import * as os from 'os'
import path from 'path'

export async function manyglob(globs: readonly string[]): Promise<readonly string[]> {
  return (
    await Promise.all(
      globs.reduce<readonly Promise<string[]>[]>((prev, glob) => {
        // Globs must always use forward slashes - even on Windows
        const homeDir = os.homedir().split(path.sep).join(path.posix.sep)
        return prev.concat(fg(glob.replace(/^~/, homeDir)))
      }, [])
    )
  ).flatMap((paths) => paths)
}
