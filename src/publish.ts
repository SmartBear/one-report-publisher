import ciEnvironment, { CiEnvironment, Env } from '@cucumber/ci-environment'
import fg from 'fast-glob'
import fs from 'node:fs'
import http from 'node:http'
import { extname } from 'node:path'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

import { readStream } from './readStream.js'
import { Authenticate } from './types.js'

const lstat = promisify(fs.lstat)

type Extension = '.xml' | '.json'
const extensions: Extension[] = ['.xml', '.json']

const contentTypes: Record<Extension, string> = {
  '.xml': 'text/xml',
  '.json': 'application/json',
}

/**
 * Publishes test results to OneReport
 *
 * @param globs a list of globs pointing to JUnit XML and Cucumber JSON files
 * @param organizationId the Organization ID on OneReport
 * @param baseUrl the base URL of OneReport (e.g. https://one-report.vercel.app/)
 * @param env the local environment, e.g. process.env (used to detect Git info from env vars set by CI)
 * @param authenticate a function that returns HTTP request headers for authentication (such as {Cookie: ...})
 * @return an array of ResponseBody constructed by parsing the response of each request as JSON
 */
export async function publish<ResponseBody>(
  globs: readonly string[],
  organizationId: string,
  baseUrl: string,
  env: Env,
  authenticate: Authenticate
): Promise<readonly ResponseBody[]> {
  const authHeaders = await authenticate()

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

  return Promise.all<ResponseBody>(paths.map((path) => publishFile(path, url, ciEnv, authHeaders)))
}

async function publishFile<ResponseBody>(
  path: string,
  url: string,
  ciEnv: CiEnvironment | undefined,
  authHeaders: http.OutgoingHttpHeaders
): Promise<ResponseBody> {
  return new Promise<ResponseBody>((resolve, reject) => {
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
              ...authHeaders,
            },
          },
          (res) => {
            if (res.statusCode !== 201) {
              return reject(new Error(`Unexpected status code ${res.statusCode}`))
            }
            readStream(res)
              .then((buffer) => {
                try {
                  const responseBody = JSON.parse(buffer.toString('utf-8')) as ResponseBody
                  return resolve(responseBody)
                } catch (err) {
                  reject(err)
                }
              })
              .catch(reject)
          }
        )

        req.on('error', reject)

        const file = fs.createReadStream(path)

        pipeline(file, req, (err) => {
          try {
            if (err) return reject(err)
          } finally {
            req.end()
          }
        })
      })
      .catch(reject)
  })
}
