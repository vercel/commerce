import React from 'react'
import s from './StaticImage.module.scss'
import Image from 'next/image'

export interface Props {
    src: StaticImageData,
    alt?: string,
    priority: boolean

}

const StaticImage = ({ src, alt, priority = true }: Props) => {
    return (
        <Image src={src} alt={alt}
            placeholder='blur'
            className={s.staticImage}
            // priority={priority}
        />
    )
}

export default StaticImage