import s from './FeaturedCardBlog.module.scss'
import { Author, DateTime } from 'src/components/common'
import Image from "next/image";
import image20 from '../../../../../public/assets/images/image20.png'
import author from '../../../../../public/assets/images/author.png'

interface FeaturedCardBlogProps{
    title?: string,
    content?: string,
    imgSrc?: any,
    imgAuthor?: any,
    date?: string,
    authorName?: string,
}

const FEATURED_DATA = {
    title: "Flammekueche with green asparagus",
    content: "Traditionally, the Flammekueche is made with rapeseed oil, which, contrary to popular belief, is indeed an oil that can be cooked hot and is not limited to seasoning. It is important to vary the oils in the kitchen to take advantage of the benefits of each. Rapeseed oil is an oil rich in omega 3 which participate in the proper functioning of the cardiovascular system as well as in vitamins E which contributes to the protection of cells against oxidative stress. In short, oils are your friends 😉",
    imgSrc: image20,
    imgAuthor: author,
    date: "APRIL 30, 2021",
    author: "Alessandro Del Piero"
}

const FeaturedCardBlog = ({ 
    title = FEATURED_DATA.title, 
    content = FEATURED_DATA.content, 
    imgSrc = FEATURED_DATA.imgSrc, 
    imgAuthor = FEATURED_DATA.imgAuthor, 
    date = FEATURED_DATA.date, 
    authorName = FEATURED_DATA.author 
}: FeaturedCardBlogProps) => {
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