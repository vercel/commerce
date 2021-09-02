
import s from './FeaturedCardBlog.module.scss'
import { Author, DateTime } from 'src/components/common'
import Image from "next/image";

interface FeaturedCardBlogProps{
    title?: string,
    content?: string,
    imgSrc: any,
    imgAuthor: any,
    date: string,
    authorName: string,
}

const FeaturedCardBlog = ({ title, content, imgSrc, imgAuthor, date, authorName }: FeaturedCardBlogProps) => {
    return (
        <section className={s.featuredCard}>
            <div className={s.featuredCardWrapper}>
                <div className={s.left}>
                    <Image src={imgSrc} alt="image feature card"/>
                </div>
                <div className={s.right}>
                    <div className={s.titleWrapper}>
                        <DateTime date={date}/>
                        <a className={s.title}>{title}</a>
                    </div>
                    <Author name={authorName} image={imgAuthor}/>
                    <div className={s.content}>{content}</div>
                </div>
            </div>
        </section>
    )
}

export default FeaturedCardBlog