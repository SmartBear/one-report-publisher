import ciEnvironment, { CiEnvironment, Env } from '@cucumber/ci-environment'
import fs from 'fs'
import http from 'http'
import https from 'https'
import { extname } from 'path'
import { pipeline } from 'stream'
import { URL } from 'url'
import { promisify } from 'util'

import { manyglob } from './manyglob.js'
import { readStream } from './readStream.js'
import { Authenticate } from './types.js'

const lstat = promisify(fs.lstat)

type Extension = '.xml' | '.json' | '.ndjson' | '.zip'
const extensions: Extension[] = ['.xml', '.json', '.ndjson', '.zip']

const contentTypes: Record<Extension, string> = {
  '.xml': 'text/xml',
  '.json': 'application/json',
  '.ndjson': 'application/x-ndjson',
  '.zip': 'application/zip',
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
  if (!Array.isArray(globs)) {
    throw new Error('globs must be an array')
  }
  if (globs.length === 0) {
    throw new Error('globs cannot be empty')
  }
  const authHeaders = await authenticate()

  const url = new URL(`/api/organization/${encodeURIComponent(organizationId)}/execution`, baseUrl)

  const ciEnv = ciEnvironment(env)

  const paths = (await manyglob(globs))
    .filter((path) => extensions.includes(extname(path) as Extension))
    .sort()

  if (paths.length === 0) {
    throw new Error(`No report files found. Please check your globs: ${JSON.stringify(globs)}`)
  }

  return Promise.all<ResponseBody>(paths.map((path) => publishFile(path, url, ciEnv, authHeaders)))
}

async function publishFile<ResponseBody>(
  path: string,
  url: URL,
  ciEnv: CiEnvironment | undefined,
  authHeaders: http.OutgoingHttpHeaders
): Promise<ResponseBody> {
  return new Promise<ResponseBody>((resolve, reject) => {
    lstat(path)
      .then((stat) => {
        let h: typeof http | typeof https
        switch (url.protocol) {
          case 'http:':
            h = http
            break
          case 'https:':
            h = https
            break
          default:
            return reject(new Error(`Unsupported protocol: ${url.toString()}`))
        }
        const headers = {
          'Content-Type': contentTypes[extname(path) as Extension],
          'Content-Length': stat.size,
          ...(ciEnv?.git?.remote ? { 'OneReport-SourceControl': ciEnv.git.remote } : {}),
          ...(ciEnv?.git?.revision ? { 'OneReport-Revision': ciEnv.git.revision } : {}),
          ...(ciEnv?.git?.branch ? { 'OneReport-Branch': ciEnv.git.branch } : {}),
          ...(ciEnv?.git?.tag ? { 'OneReport-Tag': ciEnv.git.tag } : {}),
          ...authHeaders,
        }
        const req = h.request(
          url.toString(),
          {
            method: 'POST',
            headers,
          },
          (res) => {
            if (res.statusCode !== 201) {
              return reject(
                new Error(`Unexpected status code ${res.statusCode}
POST ${url.toString()} -d @${path}
> ${Object.entries(headers)
                  .map(([h, v]) => `${h}: ${v}`)
                  .join('\n> ')}

< ${Object.entries(res.headers)
                  .map(([h, v]) => `${h}: ${v}`)
                  .join('\n< ')}
`)
              )
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
