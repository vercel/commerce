import { RecipeCardProps } from 'src/components/common/RecipeCard/RecipeCard';
import { Collection } from './../../framework/commerce/types/collection';
import { ProductCard } from './../../framework/commerce/types/product';

export interface ProductProps {
    category?: string
    name: string
    slug: string
    weight: string
    price: string
    oldPrice?: string
    discount?: string
    imageSrc: string
    isNotSell?: boolean
}

export interface FeaturedProductProps {
    title: string
    subTitle: string
    originPrice: string
    price: string
    imageSrc: string
}

export interface RecipeIngredientProps extends ProductCard {
    quantity: number
}

export interface RecipeProps {
    id?: string,
    title?: string
    slug?: string
    description?: string
    imageSrc?: string
    content?: string,
    date?: string,
    createdAt?: string,
    ingredients?: RecipeIngredientProps[]
    recommendedRecipes?: RecipeCardProps[],
    images?: BlogImgItem[],
    facetValueIds?: string[],
    collectionIds?: string[],
    collection?: string,
    people: string;
    time: string;
    country: string;
}
export interface BlogImgItem{
    url:string
}
export interface BlogProps {
    id:string,
    title: string
    slug: string
    description: string
    content: string
    imageSrc: string | null
    isPublish: boolean
    isFeatured: boolean
    authorName: string
    authorAvatarAsset: string | null
    createdAt: string
}

export interface DataHomeProps {
    bannerLeftTitle:string | null,
    videoTitle:string | null,
    videoLink:string | null,
    imageSrcLogo?: string | null,
    imageSrcBannerLeft?: string | null
}

export type MouseAndTouchEvent = MouseEvent | TouchEvent

export enum SortOrder {
    Asc = 'ASC',
    Desc = 'DESC',
}

export type filterContextType = {
    visible: boolean;
    open: () => void;
    close: () => void;
};

export interface StringMap { [key: string]: string; }

export interface FacetMap extends StringMap{
    PARENT_NAME: string
}
export interface FacetConstant{
    [key: string]: FacetMap;
}
export type PromiseWithKey = {
    key: string
    promise: PromiseLike<any>
    keyResult?: string,
}
export interface CollectionsWithData extends Collection  {
    items: ProductCard[]
}
// ref https://www.vendure.io/docs/typescript-api/orders/order-state/
export type OrderState = | 'Created'
    | 'AddingItems'
    | 'ArrangingPayment'
    | 'PaymentAuthorized'
    | 'PaymentSettled'
    | 'PartiallyShipped'
    | 'Shipped'
    | 'PartiallyDelivered'
    | 'Delivered'
    | 'Modifying'
    | 'ArrangingAdditionalPayment'
    | 'Cancelled'

export type SelectedOptions = Record<string, string | null>

export enum PageName {
    HOME = 'HOME',
    PRODUCT_LIST = 'PRODUCT_LIST',
    RECIPES = 'RECIPES'
  }

  
export enum PageNameSeo {
    ABOUT = 'ABOUT',
    CONTACT = 'CONTACT',
    HOME = 'HOME',
    PRODUCT_LIST = 'PRODUCT_LIST',
    RECIPES = 'RECIPES',
    BLOG_LIST = 'BLOG_LIST',
    PRIVACY_POLICY = 'PRIVACY_POLICY'
}