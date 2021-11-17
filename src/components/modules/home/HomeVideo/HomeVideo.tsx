import React from 'react'
import { ImgWithLink, VideoPlayer } from 'src/components/common'
import { DataHomeProps } from 'src/utils/types.utils'
import HeadingCommon from '../../../common/HeadingCommon/HeadingCommon'
import s from './HomeVideo.module.scss'
import logo_maggi from './assets/logo_maggi.png';
interface Props {
    className?: string
    children?: any,
    data?:DataHomeProps
}
const DEAFAULT_DATA_HOME ={
    videoTitle: "MAGGI SAUCE IS THE SECRET WEAPON FOR MAKING ALL YOUR FOOD",
    videoLink:"https://www.youtube.com/watch?v=nXH23nYYM3s",
    imageSrcLogo: logo_maggi.src
}


const HomeVideo = ({data}: Props) => {
    return (
        <section className={s.homeVideo}>
            <div className={s.top}>
                <div className={s.logo}>
                    <ImgWithLink src={data?.imageSrcLogo || DEAFAULT_DATA_HOME.imageSrcLogo} alt="logo"/>
                </div>
                <HeadingCommon>
                    { data?.videoTitle || DEAFAULT_DATA_HOME.videoTitle}
                </HeadingCommon>
            </div>
            <div className={s.videoWrap}>
                <VideoPlayer url={data?.videoLink || DEAFAULT_DATA_HOME.videoLink} controls={true} />
            </div>
        </section >
    )
}

export default HomeVideo
