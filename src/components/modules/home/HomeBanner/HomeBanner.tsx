import React from 'react'
import { Banner } from 'src/components/common'
import s from './HomeBanner.module.scss'
import BannerImgRight from './assets/banner_full.png'
import BannerImgRight2 from './assets/banner_product.png'

interface Props {
    className?: string
    children?: any
}

const HomeBanner = ({ }: Props) => {
    return (
        <div className={s.homeBanner}>
            <section className={s.left}>
                <div className={s.text}>
                    Freshness<br />guaranteed
                </div>
            </section >
            <Banner
                data={
                    [{
                        title: "Save 15% on your first order",
                        subtitle: "Last call! Shop deep deals on 100+ bulk picks while you can.",
                        imgLink: BannerImgRight.src,
                        size: "small",
                    },
                    {
                        title: "Save 15% on your first order 2",
                        subtitle: "Last call! Shop deep deals on 100+ bulk picks while you can.",
                        imgLink: BannerImgRight2.src,
                        size: "small",
                    }
                ]
                }
            />
        </div >
    )
}

export default HomeBanner
