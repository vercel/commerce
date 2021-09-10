import {
  CollapseCommon, EmptyCommon, ImgWithLink, Layout, RelevantBlogPosts, StaticImage
} from 'src/components/common'
import TestImg from '../public/assets/bannerrecipes.png'

const COLLAPSE_DATA = [
  {
    title: "This is a subtitle",
    content: [
      "When you’re trying to eat healthier but want something more substantial than a leafy green salad, broccoli salad is there for you. I love the crunch and heft of broccoli, especially when it’s cut up into bite size spoonable pieces.",
      "Some people aren’t into raw broccoli, but I love it! I always go for the raw broccoli on those vegetable platters that seem to be at every potluck/party you go to.",
      "This is a simple broccoli salad: you have the bulk of it, raw broccoli; crunchy red onions for a bit of acidity and raw crunch, craisins for sweetness, almonds for a nutty counter point; and a sweet and tangy soy-rice vinegar-sesame dressing.",
    ],
  },
  {
    title: "This is a subtitle",
    content: [
      "When you’re trying to eat healthier but want something more substantial than a leafy green salad, broccoli salad is there for you. I love the crunch and heft of broccoli, especially when it’s cut up into bite size spoonable pieces.",
      "Some people aren’t into raw broccoli, but I love it! I always go for the raw broccoli on those vegetable platters that seem to be at every potluck/party you go to.",
      "This is a simple broccoli salad: you have the bulk of it, raw broccoli; crunchy red onions for a bit of acidity and raw crunch, craisins for sweetness, almonds for a nutty counter point; and a sweet and tangy soy-rice vinegar-sesame dressing.",
    ],
  },
  {
    title: "This is a subtitle",
    content: [
      "When you’re trying to eat healthier but want something more substantial than a leafy green salad, broccoli salad is there for you. I love the crunch and heft of broccoli, especially when it’s cut up into bite size spoonable pieces.",
      "Some people aren’t into raw broccoli, but I love it! I always go for the raw broccoli on those vegetable platters that seem to be at every potluck/party you go to.",
      "This is a simple broccoli salad: you have the bulk of it, raw broccoli; crunchy red onions for a bit of acidity and raw crunch, craisins for sweetness, almonds for a nutty counter point; and a sweet and tangy soy-rice vinegar-sesame dressing.",
    ],
  },
  {
    title: "This is a subtitle",
    content: [
      "When you’re trying to eat healthier but want something more substantial than a leafy green salad, broccoli salad is there for you. I love the crunch and heft of broccoli, especially when it’s cut up into bite size spoonable pieces.",
      "Some people aren’t into raw broccoli, but I love it! I always go for the raw broccoli on those vegetable platters that seem to be at every potluck/party you go to.",
      "This is a simple broccoli salad: you have the bulk of it, raw broccoli; crunchy red onions for a bit of acidity and raw crunch, craisins for sweetness, almonds for a nutty counter point; and a sweet and tangy soy-rice vinegar-sesame dressing.",
    ],
  },
]
export default function Test() {
  return (
    <>
      <EmptyCommon />
      <CollapseCommon data={COLLAPSE_DATA} />
      <RelevantBlogPosts />
      <EmptyCommon description="" />
      <EmptyCommon description="No product" />
      <div className="shape-common-lg" style={{ background: "blue" }}>
        <div className="inner">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium delectus incidunt et cupiditate soluta, deleniti dolorem tempora officia atque earum recusandae vitae libero molestiae quas officiis ducimus voluptas exercitationem. Dolor non illo distinctio, nemo numquam quo nihil debitis magni ullam quasi optio, commodi at! Error, asperiores sint. Labore, at ipsum.
        </div>
      </div>
      <div className="shape-common-lg-border">
        <div className="inner">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium delectus incidunt et cupiditate soluta, deleniti dolorem tempora officia atque earum recusandae vitae libero molestiae quas officiis ducimus voluptas exercitationem. Dolor non illo distinctio, nemo numquam quo nihil debitis magni ullam quasi optio, commodi at! Error, asperiores sint. Labore, at ipsum.
        </div>
      </div>

      <div className="shape-common">
        Lorem ipsum dolor
      </div>

      <div className="shape-common-border">
        <div className="inner">
          Lorem ipsum dolor sit
        </div>
      </div>


      <ImgWithLink src="https://user-images.githubusercontent.com/76729908/131634880-8ae1437b-d3f8-421e-a546-d5a4f9a28e5f.png" alt="test" />
      <StaticImage src={TestImg} />
    </>
  )
}

Test.Layout = Layout
