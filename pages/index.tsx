
import { Author, CardBlog, CollapseCommon, Layout, RelevantBlogPosts } from 'src/components/common';
import { HomeBanner, HomeCategories, HomeCollection, HomeCTA, HomeFeature, HomeRecipe, HomeSubscribe, HomeVideo } from 'src/components/modules/home';
import {SelectCommon} from 'src/components/common'
import { QUERY_KEY, ROUTE } from 'src/utils/constanst.utils'
import card from "../public/assets/images/card.png"
import image15 from '../public/assets/images/image15.png'
import image16 from '../public/assets/images/image16.png'
import image17 from '../public/assets/images/image17.png'
import image20 from '../public/assets/images/image20.png'
import image21 from '../public/assets/images/image21.png'
import image22 from '../public/assets/images/image22.png'
import image23 from '../public/assets/images/image23.png'
import author from '../public/assets/images/author.png'
import { BlogsList, FeaturedCardBlog } from 'src/components/modules/blogs';

const data = {
  title: "Flammekueche with green asparagus",
  content: "Traditionally, the Flammekueche is made with rapeseed oil, which, contrary to popular belief, is indeed an oil that can be cooked hot and is not limited to seasoning. It is important to vary the oils in the kitchen to take advantage of the benefits of each. Rapeseed oil is an oil rich in omega 3 which participate in the proper functioning of the cardiovascular system as well as in vitamins E which contributes to the protection of cells against oxidative stress. In short, oils are your friends 😉",
  imgSrc: image20,
  imgAuthor: author,
  date: "APRIL 30, 2021",
  author: "Alessandro Del Piero"
}
const DATA_TEST = [
  {
    imageSrc: image15.src,
    title: "1",
    description: "The DEBM diet stands for "+"Delicious Happy Fun Diet"+". This diet was popularized by Robert...",
    link: `${ROUTE.BLOG_DETAIL}`,
  },
  {
    imageSrc: image16.src,
    title: "2",
    description: "Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
    link: `${ROUTE.BLOG_DETAIL}`,
  },
  {
    imageSrc: image17.src,
    title: "3",
    description: "Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
    link: `${ROUTE.BLOG_DETAIL}`,
  },
  {
    imageSrc: image21.src,
    title: "4",
    description: "The DEBM diet stands for "+"Delicious Happy Fun Diet"+". This diet was popularized by Robert...",
    link: `${ROUTE.BLOG_DETAIL}`,
  },
  {
    imageSrc: image22.src,
    title: "5",
    description: "Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
    link: `${ROUTE.BLOG_DETAIL}`,
  },
  {
    imageSrc: image23.src,
    title: "6",
    description: "Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
    link: `${ROUTE.BLOG_DETAIL}`,
  },
  {
    imageSrc: image15.src,
    title: "7",
    description: "The DEBM diet stands for "+"Delicious Happy Fun Diet"+". This diet was popularized by Robert...",
    link: `${ROUTE.BLOG_DETAIL}`,
  },
  {
    imageSrc: image16.src,
    title: "8",
    description: "Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
    link: `${ROUTE.BLOG_DETAIL}`,
  },
  {
    imageSrc: image17.src,
    title: "9",
    description: "Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
    link: `${ROUTE.BLOG_DETAIL}`,
  },
  {
    imageSrc: image23.src,
    title: "10",
    description: "Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
    link: `${ROUTE.BLOG_DETAIL}`,
  },
  {
    imageSrc: image21.src,
    title: "11",
    description: "The DEBM diet stands for "+"Delicious Happy Fun Diet"+". This diet was popularized by Robert...",
    link: `${ROUTE.BLOG_DETAIL}`,
  },
  {
    imageSrc: image22.src,
    title: "12",
    description: "Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
    link: `${ROUTE.BLOG_DETAIL}`,
  },
  {
    imageSrc: image15.src,
    title: "13",
    description: "The DEBM diet stands for "+"Delicious Happy Fun Diet"+". This diet was popularized by Robert...",
    link: `${ROUTE.BLOG_DETAIL}`,
  },
  {
    imageSrc: image16.src,
    title: "14",
    description: "Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
    link: `${ROUTE.BLOG_DETAIL}`,
  },
  {
    imageSrc: image17.src,
    title: "15",
    description: "Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
    link: `${ROUTE.BLOG_DETAIL}`,
  },
  {
    imageSrc: image21.src,
    title: "16",
    description: "The DEBM diet stands for "+"Delicious Happy Fun Diet"+". This diet was popularized by Robert...",
    link: `${ROUTE.BLOG_DETAIL}`,
  },
  {
    imageSrc: image23.src,
    title: "17",
    description: "Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
    link: `${ROUTE.BLOG_DETAIL}`,
  },
  {
    imageSrc: image22.src,
    title: "18",
    description: "Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
    link: `${ROUTE.BLOG_DETAIL}`,
  },

]
export default function Home() {
  return (
    <>
      <FeaturedCardBlog title={data.title} content={data.content} imgSrc={data.imgSrc} imgAuthor={data.imgAuthor} date={data.date} authorName={data.author} />
    
      <BlogsList data={DATA_TEST} />
    </>
  )
}

Home.Layout = Layout
