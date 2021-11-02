import Link from 'next/link';
import React from 'react';
import { Author, DateTime } from "src/components/common";
import IconFacebook from 'src/components/icons/IconFacebook';
import IconTwitter from 'src/components/icons/IconTwitter';
import { formatDate } from 'src/utils/funtion.utils';
import { BlogProps } from 'src/utils/types.utils';
import s from './BlogContent.module.scss';

interface BlogContentProps {
    blog: BlogProps
}
function BlogContent({blog: {title,createdAt,content,authorAvatarAsset,authorName=''} }:BlogContentProps)  {

    return (
        <>
             <div className={s.blogContentWrapper}>
                <DateTime date={formatDate(createdAt)}/>
                <h1>{title}</h1>
                <div className={s.author}>
                    <Author image={authorAvatarAsset || ''} name={authorName} />
                </div>
                <section className={s.content} dangerouslySetInnerHTML={{__html: content}}></section>
                  
               <div className={s.boxShare}>
                   <div className={s.share}>
                     Share to:
                   </div>
                    <div className={s.listIcon}>
                        <ul>
                            <li><Link href={`https://www.facebook.com/sharer.php?u=${(typeof window !== 'undefined') ? window.location.href : ""}`}><a> <IconFacebook/></a></Link></li>
                            <li><Link href={`https://twitter.com/intent/tweet?text=${(typeof window !== 'undefined') ? window.location.href : "" }`}><a> <IconTwitter/></a></Link></li>
                            {/* <li><Link href="/"><a> <IconInstagram/></a></Link></li> */}
                        </ul>
                    </div>
                </div> 
             </div>
          
        </>
    )
}

export default BlogContent
