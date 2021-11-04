import { ProductCardProps } from './../../../src/components/common/ProductCard/ProductCard';
import { Asset, BlogTranslation, Maybe, Product } from './../../vendure/schema.d';

export type RecipeList = Node &{
    id: string
    featuredAsset?: Maybe<Asset>
    isPublish:Boolean
    translations: Array<BlogTranslation>
    authorName: string
    authorAvatarAsset:Array<Asset>
    relevantProducts: Product
    ingredients:ProductCardProps[]
}
export type RecipesType = {
    items: RecipeList
    totalItems: number
}

export enum SortRecipes {
    ASC = 'ASC',
    DESC = 'DESC',
}

export type GetAllRecipesOperation<T extends RecipesType = RecipesType> = {
    data: { items: T['items'][], totalItems: number }
    variables: {
        excludeBlogIds:Array<Number>,
        take?: number
        id?: SortRecipes
    }
}
export type GetAllRecipePathsOperation<
T extends RecipesType = RecipesType
> = {
  data: { recipes: Pick<T['items'], 'translations'>[] }
  variables: { first?: number }
}

export type GetRecipeDetailOperation<T extends RecipesType = RecipesType> = {
    data: T['items'],
    variables: {
        slug?: string
    }
}