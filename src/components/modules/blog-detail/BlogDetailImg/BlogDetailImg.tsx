
import React from 'react';
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
             <img className={s.image} src="https://i.pinimg.com/564x/3d/42/94/3d429429428377070c4f91844a8d8755.jpg" alt="Ảnh đại diện" />
        </>
    )
}

export default BlogDetailImg
