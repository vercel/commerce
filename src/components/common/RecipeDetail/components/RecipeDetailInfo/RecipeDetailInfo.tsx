import React from 'react'
import { ResponsiveType } from 'react-multi-carousel'
import { CarouselCommon, ImgWithLink, RecipeImgItem } from 'src/components/common'
import { RecipeProps } from 'src/utils/types.utils'
import RecipeBriefInfo from '../RecipeBriefInfo/RecipeBriefInfo'
import { RecipeImgItemProps } from '../RecipeImgItem/RecipeImgItem'
import s from './RecipeDetailInfo.module.scss'

interface Prop extends RecipeProps {
    className?: string
    children?: any,
}

const RESPONSIVE: ResponsiveType = {
    desktop: {
      breakpoint: { max: 9999, min: 0 },
      items: 1,
      slidesToSlide: 1
    },
  }
const RecipeDetailInfo = ({time, people, country,  ...rest}: Prop) => {
   
    return (
        <section className={s.recipeDetailInfo}>
            <div className={s.img}>
                {rest.images === null && <ImgWithLink src= {rest.imageSrc ?? ''} alt={rest.title ?? ''} />}
                {rest.images !== null && <CarouselCommon<RecipeImgItemProps>
                    data={rest.images || []}
                    itemKey="product-detail-img"
                    Component={RecipeImgItem}
                    responsive={RESPONSIVE}
                    showDots={true}
                    arrows={false}
                />}
            </div>
            <div className={s.recipeInfo}>
                <div className={s.top}>
                    <h1 className={s.name}>
                        {rest.title}
                    </h1>
                    <RecipeBriefInfo time={time||""} people={people||""} country={country||""}/>
                </div>
                <div className={s.detail}>
                    <section className={s.content} dangerouslySetInnerHTML={{__html: rest.content ?? ''}}></section>
                </div>
            </div>
        </section >
    )
}

export default RecipeDetailInfo
