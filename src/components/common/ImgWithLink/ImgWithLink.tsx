import React from 'react'
import s from './ImgWithLink.module.scss'
import Image from 'next/image'

export interface ImgWithLinkProps {
    src: string,
    alt?: string,
}

const ImgWithLink = ({ src, alt }: ImgWithLinkProps) => {
    return (
        <div className={s.imgWithLink}>
            <Image src={src} alt={alt} layout="fill" className={s.imgWithLink} />
        </div>
    )
}

export default ImgWithLink