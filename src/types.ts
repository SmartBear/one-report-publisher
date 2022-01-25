import http from 'node:http'

export type Authenticate = () => Promise<http.OutgoingHttpHeaders>
