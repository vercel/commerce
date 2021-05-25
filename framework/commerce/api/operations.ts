import type { ServerResponse } from 'http'
import type { LoginOperation } from '../types/login'
import type { GetAllPagesOperation, GetPageOperation } from '../types/page'
import type { GetSiteInfoOperation } from '../types/site'
import type { GetCustomerWishlistOperation } from '../types/wishlist'
import type {
  GetAllProductPathsOperation,
  GetAllProductsOperation,
  GetProductOperation,
} from '../types/product'
import type { APIProvider, CommerceAPI } from '.'

const noop = () => {
  throw new Error('Not implemented')
}

export const OPERATIONS = [
  'login',
  'getAllPages',
  'getPage',
  'getSiteInfo',
  'getCustomerWishlist',
  'getAllProductPaths',
  'getAllProducts',
  'getProduct',
] as const

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
    <T extends GetAllPagesOperation>(opts?: {
      config?: P['config']
      preview?: boolean
    }): Promise<T['data']>

    <T extends GetAllPagesOperation>(
      opts: {
        config?: P['config']
        preview?: boolean
      } & OperationOptions
    ): Promise<T['data']>
  }

  getPage: {
    <T extends GetPageOperation>(opts: {
      variables: T['variables']
      config?: P['config']
      preview?: boolean
    }): Promise<T['data']>

    <T extends GetPageOperation>(
      opts: {
        variables: T['variables']
        config?: P['config']
        preview?: boolean
      } & OperationOptions
    ): Promise<T['data']>
  }

  getSiteInfo: {
    <T extends GetSiteInfoOperation>(opts: {
      config?: P['config']
      preview?: boolean
    }): Promise<T['data']>

    <T extends GetSiteInfoOperation>(
      opts: {
        config?: P['config']
        preview?: boolean
      } & OperationOptions
    ): Promise<T['data']>
  }

  getCustomerWishlist: {
    <T extends GetCustomerWishlistOperation>(opts: {
      variables: T['variables']
      config?: P['config']
      includeProducts?: boolean
    }): Promise<T['data']>

    <T extends GetCustomerWishlistOperation>(
      opts: {
        variables: T['variables']
        config?: P['config']
        includeProducts?: boolean
      } & OperationOptions
    ): Promise<T['data']>
  }

  getAllProductPaths: {
    <T extends GetAllProductPathsOperation>(opts: {
      variables?: T['variables']
      config?: P['config']
    }): Promise<T['data']>

    <T extends GetAllProductPathsOperation>(
      opts: {
        variables?: T['variables']
        config?: P['config']
      } & OperationOptions
    ): Promise<T['data']>
  }

  getAllProducts: {
    <T extends GetAllProductsOperation>(opts: {
      variables?: T['variables']
      config?: P['config']
      preview?: boolean
    }): Promise<T['data']>

    <T extends GetAllProductsOperation>(
      opts: {
        variables?: T['variables']
        config?: P['config']
        preview?: boolean
      } & OperationOptions
    ): Promise<T['data']>
  }

  getProduct: {
    <T extends GetProductOperation>(opts: {
      variables: T['variables']
      config?: P['config']
      preview?: boolean
    }): Promise<T['data']>

    <T extends GetProductOperation>(
      opts: {
        variables: T['variables']
        config?: P['config']
        preview?: boolean
      } & OperationOptions
    ): Promise<T['data']>
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
