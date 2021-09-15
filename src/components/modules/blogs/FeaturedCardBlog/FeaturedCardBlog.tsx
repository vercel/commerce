import s from './FeaturedCardBlog.module.scss'
import { Author, DateTime, ImgWithLink } from 'src/components/common'

interface FeaturedCardBlogProps{
    title?: string,
    content?: string,
    imgSrc?: string,
    imgAuthor?: string,
    date?: string,
    authorName?: string,
}

const FEATURED_DATA = {
    title: "Flammekueche with green asparagus",
    content: "Traditionally, the Flammekueche is made with rapeseed oil, which, contrary to popular belief, is indeed an oil that can be cooked hot and is not limited to seasoning. It is important to vary the oils in the kitchen to take advantage of the benefits of each. Rapeseed oil is an oil rich in omega 3 which participate in the proper functioning of the cardiovascular system as well as in vitamins E which contributes to the protection of cells against oxidative stress. In short, oils are your friends 😉",
    imgSrc: "https://user-images.githubusercontent.com/46085455/133186666-1ea8081f-4319-4617-8644-d20ed14b1825.png",
    imgAuthor: "https://user-images.githubusercontent.com/46085455/133186783-d0c71d43-b7bc-44b6-b560-818c71bd162f.png",
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
                    <ImgWithLink src={imgSrc} alt="image feature card"/>
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