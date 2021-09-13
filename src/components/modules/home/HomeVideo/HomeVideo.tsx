import Image from 'next/image'
import React from 'react'
import s from './HomeVideo.module.scss'
import LogoBrand from './assets/logo_maggi.png'
import { ProductCarousel, VideoPlayer } from 'src/components/common'
import HeadingCommon from '../../../common/HeadingCommon/HeadingCommon'
import {PRODUCT_DATA_TEST} from "../../../../utils/demo-data";

interface Props {
    className?: string
    children?: any
}


const HomeVideo = ({ }: Props) => {
    return (
        <section className={s.homeVideo}>
            <div className={s.top}>
                <div className={s.logo}>
                    <Image src={LogoBrand} />
                </div>
                <HeadingCommon>
                    Maggi Sauce Is The Secret Weapon For Making All Your Food
                </HeadingCommon>
            </div>
            <div className={s.videoWrap}>
                {/* todo: change url video */}
                <VideoPlayer url='https://www.youtube.com/watch?v=nXH23nYYM3s' controls={true} />
            </div>
            <ProductCarousel data={PRODUCT_DATA_TEST} itemKey="product-7"/>
        </section >
    )
}

export default HomeVideo
