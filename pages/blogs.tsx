import commerce from '@lib/api/commerce';
import { GetStaticPropsContext } from 'next';
import { Layout } from 'src/components/common';
import { BlogCardProps } from 'src/components/common/CardBlog/CardBlog';
import { BlogBreadCrumb, BlogHeading, BlogsList, FeaturedCardBlog } from 'src/components/modules/blogs';
import { DEFAULT_BLOG_PAGE_SIZE } from "src/utils/constanst.utils";
import { getAllPromies } from 'src/utils/funtion.utils';
import { PromiseWithKey } from 'src/utils/types.utils';



interface Props {
    blogsResult: { blogs: BlogCardProps[] }, 
    totalItems: number
}
export default function BlogsPage({blogsResult,totalItems}:Props) {
    return(
        <>
            <BlogBreadCrumb />
            <BlogHeading />
            <FeaturedCardBlog 
            title={blogsResult.blogs[0].title} 
            imgSrc={blogsResult.blogs[0].imageSrc ?? ''}
            content={blogsResult.blogs[0].description}
            />
            <BlogsList blogList={blogsResult.blogs} total={totalItems} />
        </>
    )
}


export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  let promisesWithKey = [] as PromiseWithKey[]
  let props = {} as any;


 // Blogs
 const blogsPromise = commerce.getAllBlogs({
    variables: {
        take: DEFAULT_BLOG_PAGE_SIZE
    },
    config,
    preview,
  })
  promisesWithKey.push({ key: 'blogsResult', promise: blogsPromise })


  try {
    const promises = getAllPromies(promisesWithKey)
    const rs = await Promise.all(promises)

    promisesWithKey.map((item, index) => {
      props[item.key] = item.keyResult ? rs[index][item.keyResult] : rs[index]
      return null
    })
  
    return {
      props,
      revalidate: 60
    }
  } catch (err) {

  }
}


BlogsPage.Layout = Layout
