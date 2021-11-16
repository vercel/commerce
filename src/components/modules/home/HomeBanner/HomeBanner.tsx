import { CollectionListOptions, GetCollectionsQuery } from '@framework/schema'
import React, { useEffect, useMemo, useState } from 'react'
import { Banner, StaticImage } from 'src/components/common'
import useGetProductListByCollection from 'src/components/hooks/useGetProductListByCollection'
import { ROUTE } from 'src/utils/constanst.utils'
import BannerImgRight from './assets/banner_full.png'
import HomeBannerImg from './assets/home_banner.png'
import s from './HomeBanner.module.scss'
import { ImgWithLink } from 'src/components/common';

interface Props {
    className?: string
    children?: any,
    bannerLeftTitle?:string,
    imageSrcBannerLeft?:string
}

const HomeBanner = ({ bannerLeftTitle = "FRESHNESS<br> GUARANTEED",imageSrcBannerLeft }: Props) => {
   
    return (
        <div className={s.homeBanner}>
            <section className={s.left}>
                <div className={s.imgWrap}>
                    <ImgWithLink src={imageSrcBannerLeft || HomeBannerImg.src} />
                </div>
                <div className={s.text}  dangerouslySetInnerHTML={{__html: bannerLeftTitle ?? ''}}>
                </div>
            </section >
            <Banner
                data={
                    [{
                        title: "Save 15% on your first order",
                        subtitle: "Last call! Shop deep deals on 100+ bulk picks while you can.",
                        imgLink: BannerImgRight.src,
                        size: "small",
                        linkButton: ROUTE.PRODUCTS,
                    },
                    {
                        title: "Save 15% on your first order 2",
                        subtitle: "Last call! Shop deep deals on 100+ bulk picks while you can.",
                        imgLink: BannerImgRight.src,
                        size: "small",
                        linkButton: ROUTE.PRODUCTS,
                    }
                    ]
                }
            />
        </div >
    )
}

export default HomeBanner
