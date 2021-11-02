import commerce from '@lib/api/commerce';
import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import NotFound from 'pages/404';
import { Layout, RelevantBlogPosts } from 'src/components/common';
import BlogContent from 'src/components/modules/blog-detail/BlogContent/BlogContent';
import BlogDetailImg from 'src/components/modules/blog-detail/BlogDetailImg/BlogDetailImg';
import { DEFAULT_YOU_WILL_LIKE_ALSO_SIZE, REVALIDATE_TIME } from 'src/utils/constanst.utils';
import { getAllPromies } from 'src/utils/funtion.utils';
import { BlogProps, PromiseWithKey } from 'src/utils/types.utils';
interface Props {
  blogDetail: BlogProps
  readmoreBlogs:{blogs?:BlogProps[]}
  isNotFound: boolean
}
export default function BlogDetailPage({blogDetail,readmoreBlogs, isNotFound}:Props) {
  if (isNotFound) {
    return <NotFound/>
  }
  return (
    <>
        <BlogDetailImg imgSrc={blogDetail?.imageSrc ?? ''} title={blogDetail?.title} />
        <BlogContent blog={blogDetail} />
        {(readmoreBlogs?.blogs && readmoreBlogs?.blogs?.length > 0) &&
        <RelevantBlogPosts data={readmoreBlogs.blogs} title="You will like also" bgcolor="cream"/>}
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
  const blogDetail = await commerce.getBlogDetail({
    variables: { slug: params!.slug },
    config,
    preview,
  })

  if (blogDetail === null) {
    return { isNotFound: true };
  }
  props.blogDetail = blogDetail;


  const idCurrentBlog = blogDetail?.id;
  if(idCurrentBlog){
    const blogsPromise = commerce.getAllBlogs({
      variables: {
        excludeBlogIds: [idCurrentBlog],
        take: DEFAULT_YOU_WILL_LIKE_ALSO_SIZE,
      },
      config,
      preview,
    })
    promisesWithKey.push({ key: 'readmoreBlogs', promise: blogsPromise   })
  }else{
    props.readmoreBlogs = [];
  }
  

  try {
    const promises = getAllPromies(promisesWithKey)
    const rs = await Promise.all(promises)

    promisesWithKey.map((item, index) => {
      props[item.key] = item.keyResult ? rs[index][item.keyResult] : rs[index]
      return null
    })
    
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
