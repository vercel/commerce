import React from 'react'
import s from './ImgWithLink.module.scss'

export interface ImgWithLinkProps {
    src: string,
    alt?: string,
}

const ImgWithLink = ({ src, alt }: ImgWithLinkProps) => {
    return (
        <img className={s.imgWithLink} src={src} alt={alt} />

    )
}

export default ImgWithLink