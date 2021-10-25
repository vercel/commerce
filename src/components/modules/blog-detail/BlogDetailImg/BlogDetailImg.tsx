
import React from 'react';
import { ImgWithLink } from 'src/components/common';
import BreadcrumbCommon from 'src/components/common/BreadcrumbCommon/BreadcrumbCommon';
import s from './BlogDetailImg.module.scss';
interface Props {
    className?: string
    children?: any,
    imgSrc?:string
}

const CRUMBS =[
    {
        name:"Blog",
        link:"/blog"
    }
]
const BlogDetailImg = ({imgSrc = ''}:Props ) => {
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
