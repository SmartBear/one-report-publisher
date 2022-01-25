import { Readable } from 'stream'

export async function readStream(req: Readable): Promise<Buffer> {
  const chunks = []
  for await (const chunk of req) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}
