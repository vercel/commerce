import Image from 'next/image'
import React from 'react'
import { BLUR_DATA_IMG, DEFAULT_IMG } from 'src/utils/constanst.utils'
import s from './ImgWithLink.module.scss'

export interface ImgWithLinkProps {
    src: string,
    alt?: string,
    blurDataURL?: string
    priority?: boolean
    lazyBoundary?: string
}

const ImgWithLink = ({ src, alt, blurDataURL = BLUR_DATA_IMG, priority = false, lazyBoundary = "500px" }: ImgWithLinkProps) => {
    return (
        <div className={s.imgWithLink}>
            <Image src={src || DEFAULT_IMG.src} alt={alt}
                layout="fill"
                className={s.imgWithLink}
                placeholder="blur"
                blurDataURL={blurDataURL}
                draggable='false'
                priority={priority}
                lazyBoundary={lazyBoundary}
            />
        </div>
    )
}

export default ImgWithLink