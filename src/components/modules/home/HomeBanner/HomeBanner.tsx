import React from 'react'
import { Banner, StaticImage } from 'src/components/common'
import { BannerItemProps } from 'src/components/common/Banner/BannerItem/BannerItem'
import { ROUTE } from 'src/utils/constanst.utils'
import BannerImgRight from './assets/banner_full.png'
import HomeBannerImg from './assets/home_banner.png'
import s from './HomeBanner.module.scss'

const DEFAULT_BANNER = [{
    title: "Save 15% on your first order",
    subtitle: "Last call! Shop deep deals on 100+ bulk picks while you can.",
    imgLink: BannerImgRight.src,
    size: "small",
    linkButton: ROUTE.PRODUCTS,
    backgroundColor: '#E3F2E9'
},
{
    title: "Save 15% on your first order 2",
    subtitle: "Last call! Shop deep deals on 100+ bulk picks while you can.",
    imgLink: BannerImgRight.src,
    size: "small",
    linkButton: ROUTE.PRODUCTS,
    backgroundColor: '#E3F2E9'
}
]
interface Props {
    banners: BannerItemProps[]

}

const HomeBanner = ({ banners }: Props) => {
   
    return (
        <div className={s.homeBanner}>
            <section className={s.left}>
                <div className={s.imgWrap}>
                    <StaticImage src={HomeBannerImg} />
                </div>
                <div className={s.text}>
                    Freshness<br />guaranteed
                </div>
            </section >
            <Banner
                data={banners || DEFAULT_BANNER}
            />
        </div >
    )
}

export default HomeBanner
