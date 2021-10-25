
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
    title: string
    slug: string
    description: string
    imageSrc: string
    content?: string,
    imgAuthor?: string,
    date?: string,
    authorName?: string,
}

export interface BlogProps {
    id:string,
    title: string
    slug: string
    description: string
    imageSrc: string | null,
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
