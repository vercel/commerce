import React from 'react';
import { Author, DateTime, ImgWithLink } from "src/components/common";
import IconFacebook from 'src/components/icons/IconFacebook';
import IconInstagram from 'src/components/icons/IconInstagram';
import IconTwitter from 'src/components/icons/IconTwitter';
import s from './BlogContent.module.scss';
import imageAuthor from '../../../common/Author/img/author.png';
import Link from 'next/link';
interface BlogContentProps {
    className?: string
    children?: any,
    title?: string,
    content?: string,
    imgAuthor?: string,
    date?: string,
    authorName?: string,
}
const BlogContent = ({title,date='',content,imgAuthor='',authorName='' }:BlogContentProps) => {

    return (
        <>
             <div className={s.blogContentWrapper}>
                <DateTime date={date}/>
                <h1>{title}</h1>
                <div className={s.author}>
                    <Author image={imgAuthor} name={authorName} />
                </div>
                <section className={s.content}>
                    {content}
                </section>
                  
               <div className={s.boxShare}>
                   <div className={s.share}>
                     Share to:
                   </div>
                    <div className={s.listIcon}>
                        <ul>
                            <li><Link href="/"><a> <IconFacebook/></a></Link></li>
                            <li><Link href="/"><a> <IconTwitter/></a></Link></li>
                            <li><Link href="/"><a> <IconInstagram/></a></Link></li>
                        </ul>
                    </div>
                </div> 
             </div>
          
        </>
    )
}

export default BlogContent
