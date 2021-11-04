import React from 'react'
import { ImgWithLink } from 'src/components/common'
import { RecipeProps } from 'src/utils/types.utils'
import RecipeBriefInfo from '../RecipeBriefInfo/RecipeBriefInfo'
import s from './RecipeDetailInfo.module.scss'


interface Prop extends RecipeProps {
    className?: string
    children?: any
}

const RecipeDetailInfo = ({ ...rest}: Prop) => {
    
    return (
        <section className={s.recipeDetailInfo}>
            <div className={s.img}>
                <ImgWithLink src= {rest.imageSrc ?? ''} alt={rest.title ?? ''} />
            </div>
            <div className={s.recipeInfo}>
                <div className={s.top}>
                    <h1 className={s.name}>
                        {rest.title}
                    </h1>
                    {/* <RecipeBriefInfo /> */}
                </div>
                <div className={s.detail}>
                    {rest.content}
                </div>
            </div>
        </section >
    )
}

export default RecipeDetailInfo
