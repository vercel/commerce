import { OperationContext } from '@vercel/commerce/api/operations'
import { Category } from '@vercel/commerce/types/site'
import { NormalizeCategory } from '../utils/normalize'
import { LocalConfig } from '../index'
import { AppibaseCollection } from '../../types'

export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: Category[]
    brands: any[]
  }
> = T

export default function getSiteInfoOperation({ commerce }: OperationContext<any>) {
  async function getSiteInfo({
    query,
    variables,
    config,
  }: {
    query?: string
    variables?: any
    config?: Partial<LocalConfig>
    preview?: boolean
  } = {}): Promise<GetSiteInfoResult> {

    const { fetch } = commerce.getConfig(config)

    const { res : { data } } =  await fetch('/collections');
    const categories = data.map((p : AppibaseCollection) => <Category> NormalizeCategory(p))
    
    return Promise.resolve({
      categories,
      brands: [],
    })
  }

  return getSiteInfo
}
