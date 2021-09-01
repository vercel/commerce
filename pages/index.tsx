
import { Author, CardBlog, CollapseCommon, Layout, RelevantBlogPosts } from 'src/components/common';
import { HomeBanner, HomeCategories, HomeCollection, HomeCTA, HomeFeature, HomeRecipe, HomeSubscribe, HomeVideo } from 'src/components/modules/home';
import {SelectCommon} from 'src/components/common'
import card from "../public/assets/images/card.png"
import image20 from '../public/assets/images/image20.png'
import author from '../public/assets/images/author.png'
import { FeaturedCardBlog } from 'src/components/modules/blogs';

const data = {
  title: "Flammekueche with green asparagus",
  content: "Traditionally, the Flammekueche is made with rapeseed oil, which, contrary to popular belief, is indeed an oil that can be cooked hot and is not limited to seasoning. It is important to vary the oils in the kitchen to take advantage of the benefits of each. Rapeseed oil is an oil rich in omega 3 which participate in the proper functioning of the cardiovascular system as well as in vitamins E which contributes to the protection of cells against oxidative stress. In short, oils are your friends 😉",
  imgSrc: image20,
  imgAuthor: author,
  date: "APRIL 30, 2021",
  author: "Alessandro Del Piero"
}
export default function Home() {
  return (
    <>
      <FeaturedCardBlog title={data.title} content={data.content} imgSrc={data.imgSrc} imgAuthor={data.imgAuthor} date={data.date} authorName={data.author} />
    </>
  )
}

// Home.Layout = Layout
