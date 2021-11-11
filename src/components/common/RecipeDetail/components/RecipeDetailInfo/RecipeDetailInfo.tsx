import React from 'react'
import { ResponsiveType } from 'react-multi-carousel'
import { CarouselCommon, ImgWithLink } from 'src/components/common'
import { RecipeProps } from 'src/utils/types.utils'
import RecipeBriefInfo from '../RecipeBriefInfo/RecipeBriefInfo'
import s from './RecipeDetailInfo.module.scss'
import RecipeImgItem,{RecipeImgItemProps} from '../RecipeImgItem/RecipeImgItem'

interface Prop extends RecipeProps {
    className?: string
    children?: any,
}

const RESPONSIVE: ResponsiveType = {
    desktop: {
      breakpoint: { max: 9999, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  }
const RecipeDetailInfo = ({ ...rest}: Prop) => {
   
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
                />}
            </div>
            <div className={s.recipeInfo}>
                <div className={s.top}>
                    <h1 className={s.name}>
                        {rest.title}
                    </h1>
                    {/* <RecipeBriefInfo /> */}
                </div>
                <div className={s.detail}>
                    <section className={s.content} dangerouslySetInnerHTML={{__html: rest.content ?? ''}}></section>
                </div>
            </div>
        </section >
    )
}

export default RecipeDetailInfo
