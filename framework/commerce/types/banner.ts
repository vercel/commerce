import { BannerFilterParameter, BannerList, BannerSortParameter } from '../../vendure/schema';

export type GetBannersByPageOperation<T extends BannerList = BannerList> = {
    data: { items: T['items'][], totalItems: number }
    variables: {
        take?: number
        skip?: number
        sort?: BannerSortParameter,
        filter?: BannerFilterParameter,
    }
}
