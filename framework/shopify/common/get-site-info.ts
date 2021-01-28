import { ShopifyConfig } from '../index'

type Options = {
  config: ShopifyConfig
  preview?: boolean
}

const getSiteInfo = async (options: Options) => {
  // TODO
  return {
    categories: [
      {
        path: '',
        name: '',
        entityId: 0,
      },
    ],
    brands: [
      {
        node: {
          path: '',
          name: '',
          entityId: 0,
        },
      },
    ],
  }
}

export default getSiteInfo
