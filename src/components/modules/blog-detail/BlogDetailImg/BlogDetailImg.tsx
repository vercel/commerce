
import React, { useMemo } from 'react';
import { ImgWithLink } from 'src/components/common';
import BreadcrumbCommon from 'src/components/common/BreadcrumbCommon/BreadcrumbCommon';
import s from './BlogDetailImg.module.scss';
interface Props {
    className?: string
    children?: any,
    imgSrc?:string,
    title?:string
}


const BlogDetailImg = ({imgSrc = '',title}:Props ) => {
    const CRUMBS = useMemo(()=>{
        return [
            {
                name:"Blogs",
                link:"/blogs"
            },
            {
                name:title,
            }
        ];
    },[title]);
    
    return (
        <>
            <div className={s.beadcrumb}>
                <BreadcrumbCommon crumbs={CRUMBS} />
            </div>
            <div className={s.image}>
                <ImgWithLink src={imgSrc} alt="avatar"/>
            </div>
        </>
    )
}

export default BlogDetailImg
