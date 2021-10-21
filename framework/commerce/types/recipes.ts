import { Asset, BlogTranslation, Maybe, Product } from './../../vendure/schema.d';

export type RecipeList = Node &{
    id: string
    featuredAsset?: Maybe<Asset>
    isPublish:Boolean
    translations: Array<BlogTranslation>
    authorName: string
    authorAvatarAsset:Array<Asset>
    relevantProducts: Product
    link:String
    minutes:Number
    people:Number
}
export type RecipesType = {
    items: RecipeList
    totalItems: number
}

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC',
}

export type GetAllRecipesOperation<T extends RecipesType = RecipesType> = {
    data: { items: T['items'][], totalItems: number }
    variables: {
        excludeBlogIds:Array<Number>,
        take?: number
        id?: SortOrder
    }
}