import React from 'react';

import  avt  from '../BlogDetailImg/img/blogdetail.png';
import imageAuthor from '../../../common/Author/img/author.png';

import s from './BlogDetailPage.module.scss';
import BlogContent from '../BlogContent/BlogContent';
import { BlogDetailImg } from '..';
import BreadcrumbCommon from 'src/components/common/BreadcrumbCommon/BreadcrumbCommon';


const BLOGDETAIL=
  {
    date:'APRIL 30, 2021',
    title:'The Best Sesame Soy Broccoli Salad',
    imageAuthor:imageAuthor.src,
    nameAuthor:'Alessandro Del Piero',
  };

const CRUMBS =[
    {
        name:"HOME",
        link:"/"
    },
    {
        name:"BLOG",
        link:"/blog"
    }
]

const BlogDetailPage = () => {
    return (
        <>
        <div className={s.beadcrumb}>
            <BreadcrumbCommon crumbs={CRUMBS}/>
        </div>
        <div className={s.blogDetailPageWrapper}>
            <figure className={s.avt}>
                <BlogDetailImg 
                    image={avt.src}
                    alt="ảnh đại diện"
                />   
            </figure>
            
            <BlogContent  
                date={BLOGDETAIL.date}
                title={BLOGDETAIL.title}
                imageAuthor={BLOGDETAIL.imageAuthor}
                nameAuthor={BLOGDETAIL.nameAuthor}/>
        </div>
        
            
        </>
    )
}

export default BlogDetailPage
