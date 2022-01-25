import http from 'node:http'
import fs from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const lstat = promisify(fs.lstat)

export default async function publish(
  paths: readonly string[],
  organizationId: string,
  baseUrl: string
): Promise<void[]> {
  const url = new URL(
    `/api/organization/${encodeURIComponent(organizationId)}/executions`,
    baseUrl
  ).toString()

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
              'Content-Type': 'text/xml',
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
