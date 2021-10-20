
import { Asset, BlogTranslation, Maybe, Product } from './../../vendure/schema.d';

export type BlogList = Node &{
    id: string
    featuredAsset?: Maybe<Asset>
    isHidden:Boolean
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
    data: { items: T['items'][], totalItems: number }
    variables: {
        productId: number,
        take?: number
        skip?: number
    }
}
export type GetRelevantBlogsOperation<T extends BlogsType = BlogsType> = {
    data: { items: T['items'][], totalItems: number }
    variables: {
        take?: number
        skip?: number
    }
}

export type GetBlogDetailOperation<T extends BlogsType = BlogsType> = {
    data: T['items'],
    variables: {
        slug?: string
    }
}
  
export type GetFeaturedOperation<T extends BlogsType = BlogsType> = {
    data: { items: T['items'][] }
    variables: {
        take?: number
        skip?: number
    }
}
export type GetAllBlogPathsOperation<
T extends BlogsType = BlogsType
> = {
  data: { blogs: Pick<T['items'], 'translations'>[] }
  variables: { first?: number }
}
