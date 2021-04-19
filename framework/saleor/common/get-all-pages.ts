import { getConfig, SaleorConfig } from '../api'
import { PageCountableEdge } from '../schema'
import { getAllPagesQuery } from '../utils/queries'

type Variables = {
  first?: number
}

type ReturnType = {
  pages: Page[]
}

export type Page = {
  id: string
  name: string
  url: string
  sort_order?: number
  body: string
}

const getAllPages = async (options?: {
  variables?: Variables
  config: SaleorConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 100 } } = options ?? {}
  config = getConfig(config)
  const { locale } = config
  const { data } = await config.fetch(getAllPagesQuery, { variables })

  const pages = data.pages?.edges?.map(
    ({ node: { title: name, handle, ...node } }: PageEdge) => ({
      ...node,
      url: `/${locale}/${handle}`,
      name,
    })
  )

  return { pages }
}

export default getAllPages
