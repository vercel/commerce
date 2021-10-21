import { SearchResultSortParameter } from "@framework/schema";
import { Asset, BlogTranslation, Maybe, Product } from './../../vendure/schema.d';

export type BlogList = Node &{
    id: string
    featuredAsset?: Maybe<Asset>
    isPublic:Boolean
    translations: Array<BlogTranslation>
    authorName: string
    authorAvatarAsset:Array<Asset>
    relevantProducts: Product
}
export type BlogsType = {
    items: BlogList
    totalItems: number
}
export type GetAllBlogsOperation<T extends BlogsType = BlogsType> = {
    data: { items: T['items'][] }
    variables: {
        take?: number
        skip?: number
    }
}

  
export type GetFeaturedOperation<T extends BlogsType = BlogsType> = {
    data: { items: T['items'][] }
    variables: {
        take?: number
        skip?: number
    }
}