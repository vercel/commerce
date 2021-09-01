import React from 'react'
import { ProductCardProps } from '../ProductCard/ProductCard'
import RecipeDetailInfo from './components/RecipeDetailInfo/RecipeDetailInfo'
import RecipeIngredient from './components/RecipeIngredient/RecipeIngredient'
import s from './RecipeDetail.module.scss'


interface Props {
    className?: string
    children?: any,
    ingredients: ProductCardProps[],
}

const RecipeDetail = ({ ingredients }: Props) => {
    return (
        <section className={s.recipeDetail}>
            <RecipeDetailInfo />
            <RecipeIngredient data={ingredients} />
        </section >
    )
}

export default RecipeDetail
