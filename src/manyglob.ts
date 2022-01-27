import fg from 'fast-glob'
import * as os from 'os'

export async function manyglob(globs: readonly string[]): Promise<readonly string[]> {
  return (
    await Promise.all(
      globs.reduce<readonly Promise<string[]>[]>((prev, glob) => {
        return prev.concat(fg(glob.replace(/^~/, os.homedir())))
      }, [])
    )
  ).flatMap((paths) => paths)
}
