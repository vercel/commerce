import { ProductCardProps } from './../../../src/components/common/ProductCard/ProductCard';
import { Asset, BlogTranslation, Maybe, Product } from './../../vendure/schema.d';

export type Recipe = Node &{
    id: string
    slug:string
    title:string
    description?:string
    featuredAsset?: Maybe<Asset>
    isPublish:Boolean
    translations: Array<BlogTranslation>
    relevantProducts: Product
    ingredients:ProductCardProps[]
}
export type RecipesType = {
    items: Recipe
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