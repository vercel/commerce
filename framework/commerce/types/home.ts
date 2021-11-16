import { Maybe,Asset } from './../../vendure/schema.d';
import { LanguageCode } from "@framework/schema"

export type HomeTypes = {
    id: string,
    bannerLeftTitle:string,
    videoTitle:string,
    videoLink:string,
    videologo:Maybe<Asset>,
    languageCode: LanguageCode,
    translations: HomeTranslation
}
export type HomeTranslation = {
    id: string,
    languageCode: LanguageCode,
    bannerLeftTitle: string,
    videoTitle:string
}

export type GetHomeOperation<T extends HomeTypes = HomeTypes> = {
    data: T
    variables: {
    
    }
  }