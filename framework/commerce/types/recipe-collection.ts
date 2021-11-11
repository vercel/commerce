import { RecipeCardProps } from 'src/components/common/RecipeCard/RecipeCard';
import { Asset } from '../../vendure/schema.d';

export type RecipeCollection = {
  id: string
  name: string
  slug: string
  description: string
  featuredAsset: Asset
  assets?: Asset[]
  recipes: {
    items: RecipeCardProps[]
    totalItems: number
}
}

export type SearchRecipeCollectionsBody = {
  search?: string
  sort?: string
  locale?: string
}

export type RecipeCollectionTypes = {
  collection: RecipeCollection
  searchBody: SearchRecipeCollectionsBody
}

export type SearchRecipeCollectionsHook<T extends RecipeCollectionTypes = RecipeCollectionTypes> = {
  data: {
    collections: T['collection'][]
    found: boolean
  }
  body: T['searchBody']
  input: T['searchBody']
  fetcherInput: T['searchBody']
}

export type CollectionsSchema<T extends RecipeCollectionTypes = RecipeCollectionTypes> = {
  endpoint: {
    options: {}
    handlers: {
      getCollections: SearchRecipeCollectionsHook<T>
    }
  }
}


export type GetAllCollectionsOperation<T extends RecipeCollectionTypes = RecipeCollectionTypes> = {
  data: { collections: T['collection'][] }
  variables: {
    ids?: string[]
    first?: number
  }
}

export type GetCollectionOperation<T extends RecipeCollectionTypes = RecipeCollectionTypes> = {
  data: { collection?: T['collection'] }
  variables: { code: string; } | { code?: never; }
}
