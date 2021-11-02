import s from './FeaturedCardBlog.module.scss'
import { Author, DateTime, ImgWithLink } from 'src/components/common'
import Link from 'next/link'
import { ROUTE } from 'src/utils/constanst.utils'
import { BlogProps } from 'src/utils/types.utils'
import { formatDate } from 'src/utils/funtion.utils'
interface FeaturedCardBlogProps {
    blog: BlogProps
}

const FeaturedCardBlog = ({
    blog: {
        title,
        slug,
        content,
        imageSrc = '',
        authorAvatarAsset = '',
        createdAt = '',
        authorName = ''
    }
}: FeaturedCardBlogProps) => {
    return (
        <section className={s.featuredCard}>
            <div className={s.featuredCardWrapper}>
                <Link href={`${ROUTE.BLOG_DETAIL}/${slug}`}>
                    <a> 
                        <div className={s.left}>
                            <ImgWithLink src={imageSrc ?? ''} alt="image feature card"/>
                        </div>
                    </a>
                </Link>
                <div className={s.right}>
                    <div className={s.titleWrapper}>
                        <DateTime date={formatDate(createdAt)}/>
                        <Link href={`${ROUTE.BLOG_DETAIL}/${slug}`}>
                            <a className={s.title}>{title}</a>
                        </Link>
                    </div>
                    <Author name={authorName ?? ''} image={authorAvatarAsset ?? ''}/>
                    <div className={s.content}>{content}</div>
                </div>
            </div>
        </section>
    )
}

export default FeaturedCardBlog