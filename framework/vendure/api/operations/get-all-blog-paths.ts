import { OperationContext, OperationOptions } from '@commerce/api/operations';
import { BigcommerceConfig } from '../../../bigcommerce/api';
import type { BlogTranslation, GetAllBlogPathsQuery } from '../../schema';
import { getAllBlogPathsQuery } from '../../utils/queries/get-all-blog-paths-query';
import { Provider } from '../index';
import { GetAllBlogPathsOperation } from './../../../commerce/types/blogs';

export type GetAllBlogPathsResult = {
  blogs: Array<{ node: { path: string } }>
}

export default function getAllBlogPathsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllBlogPaths<
    T extends GetAllBlogPathsOperation
  >(opts?: {
    variables?: T['variables']
    config?: BigcommerceConfig
  }): Promise<T['data']>

  async function getAllBlogPaths<T extends GetAllBlogPathsOperation>(
    opts: {
      variables?: T['variables']
      config?: BigcommerceConfig
    } & OperationOptions
  ): Promise<T['data']>

  async function getAllBlogPaths<T extends GetAllBlogPathsOperation>({
    query = getAllBlogPathsQuery,
    variables,
    config: cfg,
  }: {
    query?: string
    variables?: T['variables']
    config?: BigcommerceConfig
  } = {}): Promise<T['data']> {
    const config = commerce.getConfig(cfg)

    const { data } = await config.fetch<GetAllBlogPathsQuery>(query, {
      variables,
    })

    const blogs = data.blogs.items;
 
    return {
        blogs: blogs?.map(val=>val.translations.map((p:BlogTranslation) => ({ path: `/${p.slug}` })))
    }
  }

  return getAllBlogPaths
}
