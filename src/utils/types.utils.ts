import { SortOrder } from "@framework/schema";

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
}

export interface BlogProps {
    title: string
    slug: string
    description: string
    imageSrc: string
}

export interface CheckOutForm {
    name?: string
    email?:string
    address?: string
    city?:string
    state?:string
    code?:number
    phone?:number
    method?:string
    shipping_fee?:number
}

export type MouseAndTouchEvent = MouseEvent | TouchEvent

export type filterContextType = {
    visible: boolean;
    open: () => void;
    close: () => void;
};