import React from 'react'
import ButtonCommon from 'src/components/common/ButtonCommon/ButtonCommon'
import HeadingCommon from 'src/components/common/HeadingCommon/HeadingCommon'
import { ProductCardProps } from 'src/components/common/ProductCard/ProductCard'
import ProductCarousel from 'src/components/common/ProductCarousel/ProductCarousel'
import ViewAllItem from 'src/components/common/ViewAllItem/ViewAllItem'
import { ROUTE } from 'src/utils/constanst.utils'
import s from './RecipeIngredient.module.scss'

interface Props {
    className?: string
    children?: any,
    data?: ProductCardProps[],
}

const RecipeIngredient = ({ data }: Props) => {
    
    return (
        <section className={s.recipeIngredient}>
            <div className={s.top}>
                <HeadingCommon>Ingredients</HeadingCommon>
                <div>
                    <ViewAllItem link={ROUTE.PRODUCTS} />
                </div>
            </div>
            <ProductCarousel data={data} itemKey="recipe-ingredient" />
            <div className={s.bottom}>
                <ButtonCommon type='ghost' size='large'>Buy all</ButtonCommon>
            </div>
        </section>
    )
}

export default RecipeIngredient
