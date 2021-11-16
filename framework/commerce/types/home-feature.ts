import { Asset, FeatureTranslation, LanguageCode, Scalars } from './../../vendure/schema.d';

export type Feature = Node &{
    id: string
    createdAt?: Scalars['DateTime']
    updatedAt?: Scalars['DateTime']
    languageCode?: LanguageCode
    content?:Scalars['String']
    order: Scalars['Int']
    asset: Asset
    translations:FeatureTranslation
}
export type FeatureType = {
    items: Feature
    totalItems: number
  }

export type GetHomeFeatureOperation<T extends FeatureType = FeatureType> = {
    data: { items: T['items'][], totalItems: number }
    variables: {
      ids?: string[]
      first?: number
    }
  }