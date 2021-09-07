
import { CardBlog, CollapseCommon, Layout, RelevantBlogPosts } from 'src/components/common';
import { HomeBanner, HomeCategories, HomeCollection, HomeCTA, HomeFeature, HomeRecipe, HomeSubscribe, HomeVideo } from 'src/components/modules/home';
import {SelectCommon} from 'src/components/common'
import card from "../public/assets/images/card.png"

const CONTENT_DATA = [
  {
    title: "This is a subtitle",
    content: [
      "When you’re trying to eat healthier but want something more substantial than a leafy green salad, broccoli salad is there for you. I love the crunch and heft of broccoli, especially when it’s cut up into bite size spoonable pieces.",
      "Some people aren’t into raw broccoli, but I love it! I always go for the raw broccoli on those vegetable platters that seem to be at every potluck/party you go to.",
      "This is a simple broccoli salad: you have the bulk of it, raw broccoli; crunchy red onions for a bit of acidity and raw crunch, craisins for sweetness, almonds for a nutty counter point; and a sweet and tangy soy-rice vinegar-sesame dressing.",
    ]
  },
  {
    title: "This is a subtitle",
    content: [
      "When you’re trying to eat healthier but want something more substantial than a leafy green salad, broccoli salad is there for you. I love the crunch and heft of broccoli, especially when it’s cut up into bite size spoonable pieces.",
      "Some people aren’t into raw broccoli, but I love it! I always go for the raw broccoli on those vegetable platters that seem to be at every potluck/party you go to.",
      "This is a simple broccoli salad: you have the bulk of it, raw broccoli; crunchy red onions for a bit of acidity and raw crunch, craisins for sweetness, almonds for a nutty counter point; and a sweet and tangy soy-rice vinegar-sesame dressing.",
    ]
  },
  {
    title: "This is a subtitle",
    content: [
      "When you’re trying to eat healthier but want something more substantial than a leafy green salad, broccoli salad is there for you. I love the crunch and heft of broccoli, especially when it’s cut up into bite size spoonable pieces.",
      "Some people aren’t into raw broccoli, but I love it! I always go for the raw broccoli on those vegetable platters that seem to be at every potluck/party you go to.",
      "This is a simple broccoli salad: you have the bulk of it, raw broccoli; crunchy red onions for a bit of acidity and raw crunch, craisins for sweetness, almonds for a nutty counter point; and a sweet and tangy soy-rice vinegar-sesame dressing.",
    ]
  },
  {
    title: "This is a subtitle",
    content: [
      "When you’re trying to eat healthier but want something more substantial than a leafy green salad, broccoli salad is there for you. I love the crunch and heft of broccoli, especially when it’s cut up into bite size spoonable pieces.",
      "Some people aren’t into raw broccoli, but I love it! I always go for the raw broccoli on those vegetable platters that seem to be at every potluck/party you go to.",
      "This is a simple broccoli salad: you have the bulk of it, raw broccoli; crunchy red onions for a bit of acidity and raw crunch, craisins for sweetness, almonds for a nutty counter point; and a sweet and tangy soy-rice vinegar-sesame dressing.",
    ]
  },
]
export default function Home() {
  return (
    <>
      {/* <HomeBanner />
      <HomeBanner/>
      <HomeFeature />
      <HomeCategories />
      <HomeCollection />
      <HomeVideo />
      <HomeCTA /> */}
      {/* <HomeRecipe />
      <HomeSubscribe /> */}
      {/* <HomeRecipe /> */}
      {/* <SelectCommon option={OPTION_SORT}>Sort By</SelectCommon>
      <SelectCommon option={OPTION_SORT} size="large" type="custom">Sort By</SelectCommon> */}
      <CollapseCommon data={CONTENT_DATA} />
      <RelevantBlogPosts />
      {/* todo: uncomment */}
      {/* <ModalCreateUserInfo/> */}
    </>
  )
}

// Home.Layout = Layout
