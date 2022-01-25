import ciEnvironment, { CiEnvironment, Env } from '@cucumber/ci-environment'
import fg from 'fast-glob'
import fs from 'node:fs'
import http from 'node:http'
import { extname } from 'node:path'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const lstat = promisify(fs.lstat)

type Extension = '.xml' | '.json'
const extensions: Extension[] = ['.xml', '.json']

const contentTypes: Record<Extension, string> = {
  '.xml': 'text/xml',
  '.json': 'application/json',
}

export default async function publish(
  globs: readonly string[],
  organizationId: string,
  baseUrl: string,
  env: Env
): Promise<void[]> {
  const url = new URL(
    `/api/organization/${encodeURIComponent(organizationId)}/executions`,
    baseUrl
  ).toString()
  const ciEnv = ciEnvironment(env)

  const paths = (
    await Promise.all(
      globs.reduce<readonly Promise<string[]>[]>((prev, glob) => {
        return prev.concat(fg(glob))
      }, [])
    )
  )
    .flatMap((paths) => paths)
    .filter((path) => extensions.includes(extname(path) as Extension))
    .sort()

  return Promise.all(paths.map((path) => publishFile(path, url, ciEnv)))
}

async function publishFile(path: string, url: string, ciEnv?: CiEnvironment): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    lstat(path)
      .then((stat) => {
        const req = http.request(
          url,
          {
            method: 'POST',
            headers: {
              'Content-Type': contentTypes[extname(path) as Extension],
              'Content-Length': stat.size,
              ...(ciEnv?.git?.remote ? { 'OneReport-SourceControl': ciEnv.git.remote } : {}),
              ...(ciEnv?.git?.revision ? { 'OneReport-Revision': ciEnv.git.revision } : {}),
              ...(ciEnv?.git?.branch ? { 'OneReport-Branch': ciEnv.git.branch } : {}),
              ...(ciEnv?.git?.tag ? { 'OneReport-Tag': ciEnv.git.tag } : {}),
            },
          },
          (res) => {
            if (res.statusCode !== 201) {
              return reject(new Error(`Unexpected status code ${res.statusCode}`))
            }
            return resolve()
          }
        )

        req.on('error', reject)

        const file = fs.createReadStream(path)

        pipeline(file, req, (err) => {
          try {
            if (err) return reject(err)
            resolve()
          } finally {
            req.end()
          }
        })
      })
      .catch(reject)
  })
}
