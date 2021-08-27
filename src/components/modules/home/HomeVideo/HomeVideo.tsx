import Image from 'next/image'
import React from 'react'
import s from './HomeVideo.module.scss'
import LogoBrand from './assets/logo_maggi.png'
import { VideoPlayer } from 'src/components/common'

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
                <h2 className={s.heading}>
                    Maggi Sauce Is The Secret Weapon For Making All Your Food
                </h2>
            </div>
            <div className={s.videoWrap}>
                {/* todo: change url video */}
                <VideoPlayer url='https://www.youtube.com/watch?v=nXH23nYYM3s' controls={true} />
            </div>
        </section >
    )
}

export default HomeVideo
