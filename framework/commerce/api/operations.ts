import type { LoginOperation } from '../types/login'
import type { GetAllPagesResult } from '../types/page'
import type { ServerResponse } from 'http'
import type { APIProvider, CommerceAPI, CommerceAPICore } from '.'

const noop = () => {
  throw new Error('Not implemented')
}

export const OPERATIONS = ['login'] as const

export const defaultOperations = OPERATIONS.reduce((ops, k) => {
  ops[k] = noop
  return ops
}, {} as { [K in AllowedOperations]: typeof noop })

export type AllowedOperations = typeof OPERATIONS[number]

export type Operations<P extends APIProvider> = {
  login: {
    <T extends LoginOperation>(opts: {
      variables: T['variables']
      config?: P['config']
      res: ServerResponse
    }): Promise<T['data']>

    <T extends LoginOperation>(
      opts: {
        variables: T['variables']
        config?: P['config']
        res: ServerResponse
      } & OperationOptions
    ): Promise<T['data']>
  }
  getAllPages: {
    (opts?: {
      config?: P['config']
      preview?: boolean
    }): Promise<GetAllPagesResult>

    <T extends GetAllPagesResult>(
      opts: {
        config?: P['config']
        preview?: boolean
      } & OperationOptions
    ): Promise<T>
  }
}

export type APIOperations<P extends APIProvider> = {
  [K in keyof Operations<P>]?: (ctx: OperationContext<P>) => Operations<P>[K]
}

export type AllOperations<P extends APIProvider> = {
  [K in keyof APIOperations<P>]-?: P['operations'][K] extends (
    ...args: any
  ) => any
    ? ReturnType<P['operations'][K]>
    : typeof noop
}

export type OperationContext<P extends APIProvider> = {
  commerce: CommerceAPI<P>
}

export type OperationOptions =
  | { query: string; url?: never }
  | { query?: never; url: string }
