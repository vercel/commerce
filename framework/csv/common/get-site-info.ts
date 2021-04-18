import mock from './mock'
import { Brand, Category, CSVConfig } from './types'

interface GetSiteInfo {
  categories: Category[]
  brands: {
    node: Brand
  }[]
}

interface Parameters {
  config: CSVConfig
  preview?: boolean
}

const getSiteInfo = async (_parameters: Parameters): Promise<GetSiteInfo> => {
  const categories: Category[] = [mock.category.full]
  const brands: Brand[] = [mock.brand.full]

  return {
    categories,
    brands: brands.map((brand) => ({ node: brand })),
  }
}

export default getSiteInfo
