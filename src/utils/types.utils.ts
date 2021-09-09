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

export type MouseAndTouchEvent = MouseEvent | TouchEvent