import React from 'react'
import { ImgWithLink, VideoPlayer } from 'src/components/common'
import { DataHomeProps } from 'src/utils/types.utils'
import HeadingCommon from '../../../common/HeadingCommon/HeadingCommon'
import s from './HomeVideo.module.scss'
 
interface Props {
    className?: string
    children?: any,
    data?:DataHomeProps
}


const HomeVideo = ({data}: Props) => {

    return (
        <section className={s.homeVideo}>
            <div className={s.top}>
                <div className={s.logo}>
                    <ImgWithLink src={data?.imageSrcLogo || ''} alt="logo"/>
                </div>
                <HeadingCommon>
                    {data?.videoTitle || ''}
                </HeadingCommon>
            </div>
            <div className={s.videoWrap}>
                {/* todo: change url video */}
                <VideoPlayer url={data?.videoLink || ''} controls={true} />
            </div>
        </section >
    )
}

export default HomeVideo
