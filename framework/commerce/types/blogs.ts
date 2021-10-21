import { Asset, BlogTranslation, Maybe, Product } from './../../vendure/schema.d';

export type BlogList = Node &{
    id: string
    featuredAsset?: Maybe<Asset>
    isPublic:Boolean
    translations: BlogTranslation[]
    authorName: string
    authorAvatarAsset:Asset[]
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

  
export type GetFeaturedBlogsOperation<T extends BlogsType = BlogsType> = {
    data: { items: T['items'][] }
    variables: {
        take?: number
        skip?: number
    }
}