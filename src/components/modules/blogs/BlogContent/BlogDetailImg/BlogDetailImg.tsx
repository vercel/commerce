import Image from "next/image";
import React from 'react';

interface Props{
    image:StaticImageData,
}



const BlogDetailImg = ({image}:Props) => {
    return (
        <>
             <Image src={image} />
        </>
    )
}

export default BlogDetailImg
