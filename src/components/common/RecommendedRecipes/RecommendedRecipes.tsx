import { TOptionsEvents } from 'keen-slider';
import React from 'react';
import { ResponsiveType } from 'react-multi-carousel';
import { CarouselCommon, HeadingCommon, RecipeCard, ViewAllItem } from 'src/components/common';
import { RecipeCardProps } from 'src/components/common/RecipeCard/RecipeCard';
import { ROUTE } from 'src/utils/constanst.utils';
import s from './RecommendedRecipes.module.scss';

const RESPONSIVE: ResponsiveType = {
    largeDesktop: {
      breakpoint: { max: 9999, min: 1536 },
      items: 3.5,
      slidesToSlide: 1, // optional, default to 1.
    },
    desktop: {
      breakpoint: { max: 1536, min: 1440 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    lap: {
      breakpoint: { max: 1440, min: 1024 },
      items: 2.5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1.25,
    },
  }
interface Props {
    data: RecipeCardProps[],
}

const RecommendedRecipes = ({ data }: Props) => {
    return (
        <div className={s.recommendedRecipes}>
            <div className={s.infoProducts}>
                <HeadingCommon>Recommended Recipes</HeadingCommon>
                <ViewAllItem link={ROUTE.RECIPES} />
            </div>
            <div className={s.productsWrap}>
                <CarouselCommon<RecipeCardProps>
                    data={data}
                    Component={RecipeCard}
                    itemKey="Recommended Recipes"
                    responsive={RESPONSIVE}
                />
            </div>
        </div>
    );
};

export default RecommendedRecipes;