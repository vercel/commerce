import Image from 'next/image'
import React from 'react'
import { BLUR_DATA_IMG, DEFAULT_IMG } from 'src/utils/constanst.utils'
import s from './ImgWithLink.module.scss'

export interface ImgWithLinkProps {
    src: string,
    alt?: string,
    blurDataURL?: string
    priority: boolean

}

const ImgWithLink = ({ src, alt, blurDataURL = BLUR_DATA_IMG, priority=true }: ImgWithLinkProps) => {
    return (
        <div className={s.imgWithLink}>
            <Image src={src || DEFAULT_IMG.src} alt={alt}
                layout="fill"
                className={s.imgWithLink}
                placeholder="blur"
                blurDataURL={blurDataURL}
                draggable='false'
                priority={priority}
            />
        </div>
    )
}

export default ImgWithLink