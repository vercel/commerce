import React from 'react'
import s from './StaticImage.module.scss'
import Image from 'next/image'

export interface Props {
    src: StaticImageData,
    alt?: string,
}

const StaticImage = ({ src, alt }: Props) => {
    return (
        <Image src={src} alt={alt} placeholder='blur' className={s.staticImage}/>
    )
}

export default StaticImage