
import React from 'react';
import { ImgWithLink } from 'src/components/common';
import BreadcrumbCommon from 'src/components/common/BreadcrumbCommon/BreadcrumbCommon';
import s from './BlogDetailImg.module.scss';
interface Props {
    className?: string
    children?: any
}

const CRUMBS =[
    {
        name:"Blog",
        link:"/blog"
    }
]
const BlogDetailImg = ({}:Props ) => {
    return (
        <>
            <div className={s.beadcrumb}>
                <BreadcrumbCommon crumbs={CRUMBS} />
            </div>
            <div className={s.image}>
                <ImgWithLink src="https://user-images.githubusercontent.com/89437339/133044532-8b5f9442-841b-4187-84b4-d6cc66676b52.png" alt="Ảnh đại diện"/>
            </div>
        </>
    )
}

export default BlogDetailImg
