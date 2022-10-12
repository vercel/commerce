import type { ZodSchema } from 'zod'
import { APIResponse } from './types'

export const parseOutput = <T>(res: APIResponse<T>, parser: ZodSchema) => {
  if (res.data) {
    res.data = parser.parse(res.data)
  }
  return res
}

export default parseOutput
