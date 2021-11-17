import { OperationContext } from '@commerce/api/operations';
import { Provider, VendureConfig } from '..';
import { BannerItemProps } from '../../../../src/components/common/Banner/BannerItem/BannerItem';
import { PageName, SortOrder } from '../../../../src/utils/types.utils';
import { normalizeBanner } from '../../utils/normalize';
import { getBannersByPageQuery } from '../../utils/queries/get-banners-by-page-query';
import { GetBannersByPageQuery, QueryBannersByPageArgs } from './../../schema.d';


export default function getBannersByPageOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getBannersByPage(opts?: {
    variables?: QueryBannersByPageArgs
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<BannerItemProps[]>

  async function getBannersByPage({
    query = getBannersByPageQuery,
    variables: { ...vars } = { page: PageName.HOME },
    config: cfg,
  }: {
    query?: string
    variables?: QueryBannersByPageArgs
    config?: Partial<VendureConfig>
    preview?: boolean
  } = {}): Promise<BannerItemProps[]> {
    const config = commerce.getConfig(cfg)
    const variables = { ...vars }
    if (!vars.options) {
      vars.options = { sort: { order: SortOrder.Asc } }
    } else if (!vars.options.sort) {
      vars.options.sort = { order: SortOrder.Asc }
    }
  
    const { data } = await config.fetch<GetBannersByPageQuery>(query, {
      variables,
    })
    return data.bannersByPage.items.map((item) => normalizeBanner(item))
  }

  return getBannersByPage
}
