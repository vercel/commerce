import { getConfig, ReactionCommerceConfig } from '../api'
import { NavigationTreeItem } from '../schema'
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
  config: ReactionCommerceConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables } = options ?? {}
  config = getConfig(config)
  const { locale } = config
  console.log('locale', locale)
  const { data } = await config.fetch(getAllPagesQuery, {
    variables: {
      ...variables,
      shopId: config.shopId,
    },
  })

  const pages = data.shop?.defaultNavigationTree?.items?.map(
    ({
      navigationItem: {
        _id: id,
        data: { contentForLanguage: name, url },
      },
    }: NavigationTreeItem) => ({
      id,
      url,
      name,
      body: '',
    })
  )

  return { pages }
}

export default getAllPages
