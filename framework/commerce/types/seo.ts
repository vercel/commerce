import { BannerFilterParameter, SEOList, BannerSortParameter } from '../../vendure/schema';

export type GetSEOByPageOperation<T extends SEOList = SEOList> = {
    data: { items: T['items'][], totalItems: number }
    variables: {
        take?: number
        skip?: number
        sort?: BannerSortParameter,
        filter?: BannerFilterParameter,
    }
}
