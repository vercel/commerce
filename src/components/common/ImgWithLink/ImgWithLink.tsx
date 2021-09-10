import React from 'react'
import s from './ImgWithLink.module.scss'
import Image from 'next/image'
import { BLUR_DATA_IMG } from 'src/utils/constanst.utils'

export interface ImgWithLinkProps {
    src: string,
    alt?: string,
}

const ImgWithLink = ({ src, alt }: ImgWithLinkProps) => {
    return (
        <div className={s.imgWithLink}>
            <Image src={src} alt={alt}
                layout="fill"
                className={s.imgWithLink}
                placeholder="blur"
                blurDataURL={BLUR_DATA_IMG}
            />
        </div>
    )
}

export default ImgWithLink