export interface ProductProps {
    category: string
    name: string
    weight: string
    price: string
    imageSrc: string
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
    description:string
    imageSrc: string
}

export type MouseAndTouchEvent = MouseEvent | TouchEvent