import http from 'http'

export type Authenticate = () => http.OutgoingHttpHeaders

export type OneReportResponseBody = {
  testCycleId: string
}
