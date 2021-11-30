import React from 'react'
import { RecipeIngredientProps, RecipeProps } from 'src/utils/types.utils'
import { RecipeCardProps } from '../RecipeCard/RecipeCard'
import RecipeDetailInfo from './components/RecipeDetailInfo/RecipeDetailInfo'
import RecipeIngredient from './components/RecipeIngredient/RecipeIngredient'
import s from './RecipeDetail.module.scss'

interface Props extends RecipeCardProps {
    className?: string
    children?: any,
    ingredients?: RecipeIngredientProps[],
    productRecipe?: RecipeProps[],
}

const RecipeDetail = ({ ingredients,...rest }: Props) => {

    return (
        <section className={s.recipeDetail}>
            <RecipeDetailInfo {...rest} />
            {ingredients?.length !== 0 && <RecipeIngredient data={ingredients || []} />}
        </section >
    )
}

export default RecipeDetail
