import http from 'node:http'

export type Authenticate = () => http.OutgoingHttpHeaders
