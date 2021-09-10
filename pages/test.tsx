import {
  CollapseCommon, EmptyCommon, ImgWithLink, Layout, RelevantBlogPosts, StaticImage
} from 'src/components/common'
import TestImg from '../public/assets/images/image5.png'

export default function Test() {

  return (
    <>
      <EmptyCommon />
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
