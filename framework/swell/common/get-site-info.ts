import getCategories from '../utils/get-categories'
import getVendors, { Brands } from '../utils/get-vendors'
import { Category } from '@commerce/types'
import { getConfig, SwellConfig } from '../api'

export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: Category[]
    brands: Brands
  }
> = T

const getSiteInfo = async (options?: {
  variables?: any
  config: SwellConfig
  preview?: boolean
}): Promise<GetSiteInfoResult> => {
  let { config } = options ?? {}

  config = getConfig(config)

  const categories = await getCategories(config)
  const brands = await getVendors(config)

  return {
    categories,
    brands,
  }
}

export default getSiteInfo
