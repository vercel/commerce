import { OperationContext } from '@vercel/commerce/api/operations'
import { Category } from '@vercel/commerce/types/site'
import { KiboCommerceConfig } from '../index'
import {categoryTreeQuery} from '../queries/get-categories-tree-query'
import { normalizeCategory } from '../../lib/normalize'

export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: Category[]
    brands: any[]
  }
> = T

export default function getSiteInfoOperation({commerce}: OperationContext<any>) {
  async function getSiteInfo({
    query= categoryTreeQuery,
    variables,
    config,
  }: {
    query?: string
    variables?: any
    config?: Partial<KiboCommerceConfig>
    preview?: boolean
  } = {}): Promise<GetSiteInfoResult> {
    const cfg = commerce.getConfig(config)
    const { data } = await cfg.fetch(query);
    const categories= data.categories.items.map(normalizeCategory);
    return Promise.resolve({
      categories: categories ?? [],
      brands: [],
    })
  }

  return getSiteInfo
}
