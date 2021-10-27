import { GetAllBlogsQuery, QueryBlogs,BlogList } from '@framework/schema'
import { normalizeBlogList } from '@framework/utils/normalize'
import { getAllBlogsQuery } from '@framework/utils/queries/get-all-blog-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useGetBlogList = (customOptions?: QueryBlogs) => {
  const { data, isValidating, ...rest } = useSWR<GetAllBlogsQuery>([getAllBlogsQuery, customOptions], gglFetcher)

  return { 
          blogs: data?.blogs?.items?.map((blog:BlogList)=>normalizeBlogList(blog)),
          totalItems: data?.blogs?.totalItems || null,
          loading: isValidating,
           ...rest 
        }
}

export default useGetBlogList
