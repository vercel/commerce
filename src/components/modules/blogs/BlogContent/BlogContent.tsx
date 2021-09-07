import React from 'react';
import { Author, DateTime } from "src/components/common";
import s from './BlogContent.module.scss';
interface BlogContentProps {
    date: string,
    title: string,
    imageAuthor:StaticImageData,
    nameAuthor:string,
    content:string
}
const BlogContent = ({date,title,imageAuthor,nameAuthor,content}:BlogContentProps) => {
    return (
        <>
             <div className={s.blogContentWrapper}>
                <DateTime date={date}/>
                <h1 >{title}</h1>
                <Author image={imageAuthor} name={nameAuthor} />
                <p>{content}</p>
             </div>
          
        </>
    )
}

export default BlogContent
