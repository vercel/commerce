import { OperationContext } from '@commerce/api/operations';
import { normalizeHomeFeature } from '@framework/utils/normalize';
import { Provider, VendureConfig } from '..';
import { SortOrder } from '../../../../src/utils/types.utils';
import { HomeFeatureItemProps } from './../../../../src/components/modules/home/HomeFeature/components/HomeFeatureItem/HomeFeatureItem';
import { GetHomeFeatureQuery, QueryHomeFeatureArgs } from './../../schema.d';
import { getHomeFeatureQuery } from './../../utils/queries/get-home-feature-query';


export default function getHomeFeatureOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getHomeFeature(opts?: {
    variables?: QueryHomeFeatureArgs
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<HomeFeatureItemProps[]>

  async function getHomeFeature({
    query = getHomeFeatureQuery,
    variables: { ...vars } = {},
    config: cfg,
  }: {
    query?: string
    variables?: QueryHomeFeatureArgs
    config?: Partial<VendureConfig>
    preview?: boolean
  } = {}): Promise<HomeFeatureItemProps[] | any []> {
    const config = commerce.getConfig(cfg)
    const variables = { ...vars }
    if (!vars.options) {
      vars.options = { sort: { order: SortOrder.Asc } }
    } else if (!vars.options.sort) {
      vars.options.sort = { order: SortOrder.Asc }
    }

    const { data } = await config.fetch<GetHomeFeatureQuery>(query, {
      variables,
    })
   
    return data.features.items.map((item) => normalizeHomeFeature(item))
  }

  return getHomeFeature
}
