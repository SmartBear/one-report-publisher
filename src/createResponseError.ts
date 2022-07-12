import http from 'http'

export function createResponseError(
  res: http.IncomingMessage,
  url: URL,
  reqHeaders: http.OutgoingHttpHeaders,
  responseBody: string,
  requestBodyPath?: string
): Error {
  return new Error(`Unexpected status code ${res.statusCode}
POST ${url.toString()} ${requestBodyPath ? `-d @${requestBodyPath}` : ''}
> ${Object.entries(reqHeaders)
    .map(([h, v]) => `${h}: ${v}`)
    .join('\n> ')}

< ${Object.entries(res.headers)
    .map(([h, v]) => `${h}: ${v}`)
    .join('\n< ')}

${responseBody}
`)
}
