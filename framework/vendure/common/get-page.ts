import { VendureConfig, getConfig } from '../api'

export type Page = any

export type GetPageResult<T extends { page?: any } = { page?: Page }> = T

export type PageVariables = {
  id: number
}

async function getPage(opts: {
  url?: string
  variables: PageVariables
  config?: VendureConfig
  preview?: boolean
}): Promise<GetPageResult>

async function getPage<T extends { page?: any }, V = any>(opts: {
  url: string
  variables: V
  config?: VendureConfig
  preview?: boolean
}): Promise<GetPageResult<T>>

async function getPage({
  url,
  variables,
  config,
  preview,
}: {
  url?: string
  variables: PageVariables
  config?: VendureConfig
  preview?: boolean
}): Promise<GetPageResult> {
  config = getConfig(config)
  return {}
}

export default getPage
