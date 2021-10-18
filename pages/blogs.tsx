import commerce from '@lib/api/commerce';
import { GetStaticPropsContext } from 'next';
import { Layout } from 'src/components/common';
import { BlogCardProps } from 'src/components/common/CardBlog/CardBlog';
import { BlogBreadCrumb, BlogHeading, BlogsList, FeaturedCardBlog } from 'src/components/modules/blogs';
import { DEFAULT_BLOG_PAGE_SIZE,DEFAULT_FEATURED_BLOG_PAGE_SIZE } from "src/utils/constanst.utils";
import { getAllPromies } from 'src/utils/funtion.utils';
import { PromiseWithKey } from 'src/utils/types.utils';
import { getIdFeaturedBlog } from 'src/utils/funtion.utils';


interface Props {
    blogsResult: { blogs?: BlogCardProps[],featuredBlogs?: BlogCardProps[] },
    totalItems: number
}
export default function BlogsPage({blogsResult,totalItems}:Props) {

    // let date = new Date(blogsResult?.featuredBlogs[0]?.createdAt ?? '' );
    // let fullDate = date.toLocaleString('en-us', { month: 'long' }) + " " + date.getDate()+","+date.getFullYear();
   
    return(
        <>
            <BlogBreadCrumb />
            <BlogHeading />
            {/* <FeaturedCardBlog 
            title={blogsResult?.featuredBlogs[0]?.title} 
            imgSrc={blogsResult?.featuredBlogs[0]?.imageSrc ?? ''}
            content={blogsResult?.featuredBlogs[0]?.description}
            imgAuthor={blogsResult?.featuredBlogs[0]?.authorAvatarAsset}
            authorName={blogsResult?.featuredBlogs[0]?.authorName}
            date={fullDate}
            /> */}
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


  const {featuredBlogs} = await commerce.getFeaturedBlog({
    variables: {
      take: DEFAULT_BLOG_PAGE_SIZE
    },
    config,
    preview,
  })
 
  
  // console.log(featuredBlogs[0].id);
  // promisesWithKey.push({ key: 'blogsResult', promise: FeaturedBlogPromise })

  
 // Blogs
 const  idBlog = featuredBlogs[0].id;
 const blogsPromise = commerce.getAllBlogs({
    variables: {
      excludeBlogIds: [idBlog],
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
    props['blogsResult']['featuredBlog'] = featuredBlogs;

    return {
      props,
      revalidate: 60
    }
  } catch (err) {

  }
}


BlogsPage.Layout = Layout
