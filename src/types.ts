import http from 'http'

export type Authenticate = () => Promise<http.OutgoingHttpHeaders>

export type OneReportResponseBody = {
  testSetExecutionId: string
  reportId: string
}
