
import React from 'react';
import s from './BlogDetailImg.module.scss';
interface Props{
    image:string,
    alt?:string
}

const BlogDetailImg = ({image,alt}:Props) => {
    return (
        <>
             <img className={s.image} src={image} alt={alt} />
        </>
    )
}

export default BlogDetailImg
