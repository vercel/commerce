import React from 'react'
import { Banner } from 'src/components/common'
import BannerRight from './assets/bannerrecipes.png'
import s from './ProductListBanner.module.scss'

interface Props {
}

const ProductListBanner = ({ }: Props) => {
    return (
        <div className={s.productListBanner}>
            <Banner
                data={
                    [{
                        title: "Save 15% on your first order",
                        subtitle: "Last call! Shop deep deals on 100+ bulk picks while you can.",
                        imgLink: BannerRight.src,
                        size: "large",
                    }
                    ]
                }
            />
        </div >
    )
}

export default ProductListBanner
