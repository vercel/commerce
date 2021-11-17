import React from 'react'
import { Banner } from 'src/components/common'
import { BannerItemProps } from 'src/components/common/Banner/BannerItem/BannerItem'
import BannerRight from './assets/bannerrecipes.png'
import s from './ProductListBanner.module.scss'

interface Props {
    banners: BannerItemProps[]
}

const DEFAULT_BANNER:BannerItemProps[] = [{
    title: "Save 15% on your first order",
    subtitle: "Last call! Shop deep deals on 100+ bulk picks while you can.",
    imgLink: BannerRight.src,
    size: "large",
},
{
    title: "Save 15% on your first order",
    subtitle: "Last call! Shop deep deals on 100+ bulk picks while you can.",
    imgLink: BannerRight.src,
    size: "large",
}
]
const ProductListBanner = ({banners }: Props) => {
    return (
        <div className={s.productListBanner}>
            <Banner
                data={banners.length !== 0 ? banners : DEFAULT_BANNER}
                size="large"
            />
        </div >
    )
}

export default ProductListBanner
