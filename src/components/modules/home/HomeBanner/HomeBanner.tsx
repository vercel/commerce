import React from 'react'
import { Banner, StaticImage } from 'src/components/common'
import { BannerItemProps } from 'src/components/common/Banner/BannerItem/BannerItem'
import HomeBannerImg from './assets/home_banner.png'
import s from './HomeBanner.module.scss'

interface Props {
    banners: BannerItemProps[]

}

const HomeBanner = ({ banners }: Props) => {
    // console.log('banners: ', banners)
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
                data={ banners
                }
            />
        </div >
    )
}

export default HomeBanner
