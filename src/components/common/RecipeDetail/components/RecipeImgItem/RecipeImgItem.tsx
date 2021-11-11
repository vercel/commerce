import React from 'react'
import { ImgWithLink } from 'src/components/common'
import s from './RecipeImgItem.module.scss'

export interface RecipeImgItemProps {
    url?: string
    alt?: string
}


const RecipeImgItem = ({ url, alt }: RecipeImgItemProps) => {
    return (
        <section className={s.recipeImgItem}>
            <ImgWithLink src={url ?? ""} alt={alt} />
        </section >
    )
}

export default RecipeImgItem
