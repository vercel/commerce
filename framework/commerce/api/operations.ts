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

export type LoginResult<T extends { result?: any } = { result?: string }> = T

export type Operations<P extends APIProvider> = {
  login: {
    (opts: {
      variables: any
      config?: P['config']
      res: ServerResponse
    }): Promise<LoginResult>

    <T extends { result?: any }, V = any>(opts: {
      query: string
      variables: V
      res: ServerResponse
      config?: P['config'] | undefined
    }): Promise<LoginResult<T>>
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
