import { GetAllBlogsQuery, QueryBlogs,BlogList } from '@framework/schema'
import { getAllBlogsQuery } from '@framework/utils/queries/get-all-blog-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useGetBlogList = (options?: QueryBlogs) => {
  const { data, isValidating, ...rest } = useSWR<GetAllBlogsQuery>([getAllBlogsQuery, options], gglFetcher)
  console.log(isValidating);
  return { 
          blogs: data?.blogs?.items?.map((val:BlogList)=>({
              id: val.id,
              title: val.translations[0]?.title,
              imageSrc: val.featuredAsset?.preview ?? null,
              slug: val.translations[0]?.slug,
              description: val.translations[0]?.description,
              isHidden: val.isHidden
          })),
          totalItems: data?.blogs?.totalItems || null,
          loading: isValidating,
           ...rest 
        }
}

export default useGetBlogList
