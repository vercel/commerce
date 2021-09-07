import { TOptionsEvents } from 'keen-slider';
import React from 'react';
import { CarouselCommon, HeadingCommon, RecipeCard, ViewAllItem } from 'src/components/common';
import { RecipeCardProps } from 'src/components/common/RecipeCard/RecipeCard';
import { ROUTE } from 'src/utils/constanst.utils';
import s from './RecommendedRecipes.module.scss';

const OPTION_DEFAULT: TOptionsEvents = {
    slidesPerView: 1.25,
    mode: 'free',
    spacing: 24,
    breakpoints: {
        '(min-width: 640px)': {
            slidesPerView: 2,
        },
        '(min-width: 1024px)': {
            slidesPerView: 2.5,
        },
        '(min-width: 1440px)': {
            slidesPerView: 3,
        },
        '(min-width: 1536px)': {
            slidesPerView: 3.5,
        },
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
                    option={OPTION_DEFAULT}
                />
            </div>
        </div>
    );
};

export default RecommendedRecipes;