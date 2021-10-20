import { Layout, RelevantBlogPosts } from 'src/components/common';
import BlogContent from 'src/components/modules/blog-detail/BlogContent/BlogContent';
import BlogDetailImg from 'src/components/modules/blog-detail/BlogDetailImg/BlogDetailImg';
import { BLOGS_DATA_TEST } from 'src/utils/demo-data'
import { GetStaticPropsContext,GetStaticPathsContext } from 'next';
import { PromiseWithKey } from 'src/utils/types.utils';
import { getAllPromies } from 'src/utils/funtion.utils';
import commerce from '@lib/api/commerce';
import { BlogCardProps } from 'src/components/common/CardBlog/CardBlog';
import {  REVALIDATE_TIME } from 'src/utils/constanst.utils'
interface Props {
  blog:{blogDetail?: BlogCardProps},
  relevantBlogs:{blogDetail?:BlogCardProps[]}
}
export default function BlogDetailPage({blog,relevantBlogs}:Props) {

  let date = new Date(blog?.blogDetail?.createdAt ?? '' );
  let fullDate = date.toLocaleString('en-us', { month: 'long' }) + " " + date.getDate()+","+date.getFullYear();
  
  return (
    <>
        <BlogDetailImg imgSrc={blog?.blogDetail?.imageSrc ?? ''} />
        <BlogContent 
          title={blog?.blogDetail?.title} 
          content={blog?.blogDetail?.description}
          imgAuthor={blog?.blogDetail?.authorAvatarAsset}
          authorName={blog?.blogDetail?.authorName}
          date={fullDate}
        />
        {relevantBlogs.relevantBlogs?.length> 0 && <RelevantBlogPosts data={relevantBlogs.relevantBlogs} title="You will like also" bgcolor="cream"/>}
    </>
  )
}


export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }> ) {
  const config = { locale, locales }
  let promisesWithKey = [] as PromiseWithKey[]
  let props = {} as any
  
   // Blog detail
  const blogDetailPromise = await commerce.getBlogDetail({
    variables: { slug: params!.slug },
    config,
    preview,
  })
  props.blog = blogDetailPromise;
  
  if (!blogDetailPromise) {
    throw new Error(`Blog with slug '${params!.slug}' not found`)
  }

  // Relevant Blogs
  const relevantProductId = blogDetailPromise.blogDetail.relevantProducts?.[0];
  if (relevantProductId && blogDetailPromise.blogDetail.relevantProducts.length > 0) {

    const relevantBlogs = commerce.getRelevantBlogs({
      variables: { productId: relevantProductId },
      config,
      preview,
    })
    promisesWithKey.push({ key: 'relevantBlogs', promise: relevantBlogs})

  }else {
    props.relevantBlogs = [];
  }
  

  try {
    const promises = getAllPromies(promisesWithKey)
    const rs = await Promise.all(promises)

    promisesWithKey.map((item, index) => {
      props[item.key] = item.keyResult ? rs[index][item.keyResult] : rs[index]
      return null
    })
    
    console.log(props.relevantBlogs);
    return {
      props,
      revalidate: REVALIDATE_TIME,
    }
  } catch (err) {

  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  
  const { blogs } = await commerce.getAllBlogPaths()

  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
        blogs.forEach((blog: any) => {
          arr.push(`/${locale}/blog/${blog.slug}`)
        })
        return arr
      }, [])
      : blogs.map((product: any) => `/blog/${product.path}`),
    fallback: 'blocking',
  }
}



BlogDetailPage.Layout = Layout
