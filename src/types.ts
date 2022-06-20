import http from 'http'

export type Authenticate = () => http.OutgoingHttpHeaders

export type OneReportResponseBody = {
  testSetExecutionId: string
  reportId: string
}
