
import { Author, CardBlog, CollapseCommon, Layout, RelevantBlogPosts } from 'src/components/common';
import { HomeBanner, HomeCategories, HomeCollection, HomeCTA, HomeFeature, HomeRecipe, HomeSubscribe, HomeVideo } from 'src/components/modules/home';
import {SelectCommon} from 'src/components/common'
import { QUERY_KEY, ROUTE } from 'src/utils/constanst.utils'
import card from "../public/assets/images/card.png"
import { BlogsList, FeaturedCardBlog, BlogHeading } from 'src/components/modules/blogs';

export default function Home() {
  return (
    <>
      <BlogHeading />
      <FeaturedCardBlog />
      <BlogsList />
    </>
  )
}

Home.Layout = Layout
