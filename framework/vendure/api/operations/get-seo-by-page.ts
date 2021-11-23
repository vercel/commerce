import { PageNameSeo } from './../../../../src/utils/types.utils';
import { OperationContext } from '@commerce/api/operations';
import { Provider, VendureConfig } from '..';
import { normalizeSEO } from '../../utils/normalize';
import { getSEOByPageQuery } from '../../utils/queries/get-seo-by-page-query';
import { GetSEOByPageQuery, QuerySeoByPageArgs } from './../../schema.d';
interface SeoItemProps {
    imgLink: string,
    title: string,
    description?: string,
}

export default function getSEOByPageOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getSEOByPage(opts?: {
    variables?: QuerySeoByPageArgs
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<SeoItemProps[]>

  async function getSEOByPage({
    query = getSEOByPageQuery,
    variables: { ...vars } = { page: PageNameSeo.HOME },
    config: cfg,
  }: {
    query?: string
    variables?: QuerySeoByPageArgs
    config?: Partial<VendureConfig>
    preview?: boolean
  } = {}): Promise<SeoItemProps[] | null> {
    const config = commerce.getConfig(cfg)
    const variables = { ...vars }
  
    const { data } = await config.fetch<GetSEOByPageQuery>(query, {
      variables,
    })
    
    return null;
  }

  return getSEOByPage
}
