import commerce from '@lib/api/commerce';
import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import { Layout, RelevantBlogPosts } from 'src/components/common';
import { BlogCardProps } from 'src/components/common/CardBlog/CardBlog';
import BlogContent from 'src/components/modules/blog-detail/BlogContent/BlogContent';
import BlogDetailImg from 'src/components/modules/blog-detail/BlogDetailImg/BlogDetailImg';
import { REVALIDATE_TIME,DEFAULT_YOU_WILL_LIKE_ALSO_SIZE } from 'src/utils/constanst.utils';
import { formatDate, getAllPromies } from 'src/utils/funtion.utils';
import { PromiseWithKey } from 'src/utils/types.utils';
interface Props {
  blog:{blogDetail?: BlogCardProps},
  readmoreBlogs:{blogs?:BlogCardProps[]}
}
export default function BlogDetailPage({blog,readmoreBlogs}:Props) {

  return (
    <>
        <BlogDetailImg imgSrc={blog?.blogDetail?.imageSrc ?? ''} title={blog?.blogDetail?.title} />
        <BlogContent 
          title={blog?.blogDetail?.title} 
          content={blog?.blogDetail?.description}
          imgAuthor={blog?.blogDetail?.authorAvatarAsset ?? ''}
          authorName={blog?.blogDetail?.authorName}
          date={formatDate(blog?.blogDetail?.createdAt ?? '')}
        />
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
  const blogDetailPromise = await commerce.getBlogDetail({
    variables: { slug: params!.slug },
    config,
    preview,
  })

  if (blogDetailPromise.blogDetail === null) {
    return { notFound: true };
  }
  props.blog = blogDetailPromise;

  const idCurrentBlog = blogDetailPromise?.blogDetail?.id;
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
