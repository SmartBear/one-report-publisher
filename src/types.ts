import http from 'http'

export type Authenticate = () => Promise<http.OutgoingHttpHeaders>
