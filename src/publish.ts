import http from 'node:http'
import fs from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import fg from 'fast-glob'
import { extname } from 'node:path'

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
  baseUrl: string
): Promise<void[]> {
  const url = new URL(
    `/api/organization/${encodeURIComponent(organizationId)}/executions`,
    baseUrl
  ).toString()

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

  return Promise.all(paths.map((path) => publishFile(path, url)))
}

async function publishFile(path: string, url: string): Promise<void> {
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
