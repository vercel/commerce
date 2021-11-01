import commerce from '@lib/api/commerce';
import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import { Layout, RelevantBlogPosts } from 'src/components/common';
import { BlogCardProps } from 'src/components/common/CardBlog/CardBlog';
import BlogContent from 'src/components/modules/blog-detail/BlogContent/BlogContent';
import BlogDetailImg from 'src/components/modules/blog-detail/BlogDetailImg/BlogDetailImg';
import { REVALIDATE_TIME } from 'src/utils/constanst.utils';
import { formatDate, getAllPromies } from 'src/utils/funtion.utils';
import { PromiseWithKey } from 'src/utils/types.utils';
interface Props {
  blog:{blogDetail?: BlogCardProps},
  relevant:{relevantBlogs?:BlogCardProps[]}
}
export default function BlogDetailPage({blog,relevant}:Props) {
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
        {(relevant?.relevantBlogs && relevant?.relevantBlogs?.length > 0) &&
        <RelevantBlogPosts data={relevant.relevantBlogs} title="You will like also" bgcolor="cream"/>}
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
  

  // Relevant Blogs
  const relevantProductId = blogDetailPromise?.blogDetail?.relevantProducts?.[0];
  if (relevantProductId && blogDetailPromise?.blogDetail?.relevantProducts?.length > 0) {

    const relevantBlogs = commerce.getRelevantBlogs({
      variables: { productId: Number(relevantProductId) },
      config,
      preview,
    })
    promisesWithKey.push({ key: 'relevant', promise: relevantBlogs})
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
