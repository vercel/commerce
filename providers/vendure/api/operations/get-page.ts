import { VendureConfig, Provider } from '../'
import { OperationContext } from '@commerce/api/operations'

export type Page = any

export type GetPageResult<T extends { page?: any } = { page?: Page }> = T

export type PageVariables = {
  id: number
}

export default function getPageOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getPage(opts: {
    url?: string
    variables: PageVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<GetPageResult>

  async function getPage<T extends { page?: any }, V = any>(opts: {
    url: string
    variables: V
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<GetPageResult<T>>

  async function getPage({
    url,
    variables,
    config: cfg,
    preview,
  }: {
    url?: string
    variables: PageVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<GetPageResult> {
    const config = commerce.getConfig(cfg)
    return {}
  }

  return getPage
}
