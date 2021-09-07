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

export interface CheckOutForm {
    name: string
    email:string
    address: string
    city:string
    state:string
    code:number
    phone:number
    method:string
    shipping_fee:number
}


export type MouseAndTouchEvent = MouseEvent | TouchEvent