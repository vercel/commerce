import React from 'react'
import { Banner } from 'src/components/common'
import BannerRight from './assets/bannerrecipes.png'
import s from './RecipeListBanner.module.scss'

interface Props {
}

const RecipeListBanner = ({ }: Props) => {
    return (
        <div className={s.recipeListBanner}>
            <Banner
                data={
                    [{
                        title: "Save 15% on your first order",
                        subtitle: "Last call! Shop deep deals on 100+ bulk picks while you can.",
                        imgLink: BannerRight.src,
                        size: "large",
                    },
                    ]
                }
            />
        </div >
    )
}

export default RecipeListBanner
