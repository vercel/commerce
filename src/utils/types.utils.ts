import { Product } from './../../framework/vendure/schema.d';
import { ProductCardProps } from './../components/common/ProductCard/ProductCard';
import { ProductCard } from './../../framework/commerce/types/product';
import { Collection } from './../../framework/commerce/types/collection';

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

export interface RecipeProps {
    id?:string | null,
    title: string | null
    slug: string | null
    description: string | null
    imageSrc: string | null
    content?: string | null,
    date?: string | null,
    createdAt?:string | null,
    ingredients?: ProductCard[]
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
