import React from 'react'
import { Banner } from 'src/components/common'
import BannerImgRight from './assets/banner_full.png'
import HomeBannerImg from './assets/home_banner.png'
import s from './HomeBanner.module.scss'
import Image from 'next/image'

interface Props {
    className?: string
    children?: any
}

const HomeBanner = ({ }: Props) => {
    return (
        <div className={s.homeBanner}>
            <section className={s.left}>
                <div className={s.imgWrap}>
                    <Image src={HomeBannerImg} placeholder='blur' />
                </div>
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
                        imgLink: BannerImgRight.src,
                        size: "small",
                    }
                    ]
                }
            />
        </div >
    )
}

export default HomeBanner
