
import React from 'react';

interface Props{
    image:string,
    alt?:string
}



const BlogDetailImg = ({image,alt}:Props) => {
    return (
        <>
             <img src={image} alt={alt} />
        </>
    )
}

export default BlogDetailImg
