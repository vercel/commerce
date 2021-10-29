import s from './FeaturedCardBlog.module.scss'
import { Author, DateTime, ImgWithLink } from 'src/components/common'
import Link from 'next/link'
import { ROUTE } from 'src/utils/constanst.utils'
interface FeaturedCardBlogProps{
    title?: string | null,
    slug?:string | null,
    content?: string | null,
    imgSrc?: string | null,
    imgAuthor?: string | null,
    date?: string | null,
    authorName?: string | null,
}

const FeaturedCardBlog = ({ 
    title,
    slug,
    content, 
    imgSrc = '', 
    imgAuthor = '', 
    date = '', 
    authorName = ''
}: FeaturedCardBlogProps) => {
    return (
        <section className={s.featuredCard}>
            <div className={s.featuredCardWrapper}>
                <Link href={`${ROUTE.BLOG_DETAIL}/${slug}`}>
                    <a> 
                        <div className={s.left}>
                            <ImgWithLink src={imgSrc ?? ''} alt="image feature card"/>
                        </div>
                    </a>
                </Link>
                <div className={s.right}>
                    <div className={s.titleWrapper}>
                        <DateTime date={date ?? ''}/>
                        <Link href={`${ROUTE.BLOG_DETAIL}/${slug}`}>
                            <a className={s.title}>{title}</a>
                        </Link>
                    </div>
                    <Author name={authorName ?? ''} image={imgAuthor ?? ''}/>
                    <div className={s.content}>{content}</div>
                </div>
            </div>
        </section>
    )
}

export default FeaturedCardBlog