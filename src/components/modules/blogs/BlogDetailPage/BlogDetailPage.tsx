import React from 'react';

import  avt  from '../BlogDetailImg/img/blogdetail.png';
import imageAuthor from '../../../common/Author/img/author.png';

import s from './BlogDetailPage.module.scss';
import BlogContent from '../BlogContent/BlogContent';
import { BlogDetailImg } from '..';
import BreadcrumbCommon from 'src/components/common/BreadcrumbCommon/BreadcrumbCommon';
import RelevantBlogPosts from 'src/components/common/RelevantBlogPosts/RelevantBlogPosts';
import { ROUTE } from 'src/utils/constanst.utils';

import image15 from '../../../../../public/assets/images/image15.png';
import image16 from '../../../../../public/assets/images/image16.png'
import image17 from '../../../../../public/assets/images/image17.png'

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

const BLOGS = [
    {
        title: "Want to Lose Weight? Here are 10 DEBM Diet Guidelines for Beginners",
        description:"The DEBM diet stands for "+'"Delicious Happy Fun Diet"'+". This diet was popularized by Robert...",
        imageSrc: image15.src,
        link: `${ROUTE.BLOG_DETAIL}`
    },{
        title: "9 Ways to Make an Aloe Vera Mask at Home",
        description:"Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
        imageSrc: image16.src,
        link: `${ROUTE.BLOG_DETAIL}`
    },{
        title: "Don't Buy Wrong, Here Are 7 Ways to Choose a Ripe Dragon Fruit",
        description:"Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
        imageSrc: image17.src,
        link: `${ROUTE.BLOG_DETAIL}`
    },{
        title: "Want to Lose Weight? Here are 10 DEBM Diet Guidelines for Beginners",
        description:"The DEBM diet stands for "+'"Delicious Happy Fun Diet"'+". This diet was popularized by Robert...",
        imageSrc: image15.src,
        link: `${ROUTE.BLOG_DETAIL}`
    },{
        title: "9 Ways to Make an Aloe Vera Mask at Home",
        description:"Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
        imageSrc: image16.src,
        link: `${ROUTE.BLOG_DETAIL}`
    },{
        title: "Don't Buy Wrong, Here Are 7 Ways to Choose a Ripe Dragon Fruit",
        description:"Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
        imageSrc: image17.src,
        link: `${ROUTE.BLOG_DETAIL}`
    }];

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
        <div className={s.relevantBlogPosts}>
            <RelevantBlogPosts data={BLOGS} title="You will like also" bgcolor="cream"/>
        </div>
            
        </>
    )
}

export default BlogDetailPage
