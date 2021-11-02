import { QueryBlogs } from '@framework/schema'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import CardBlog, { BlogCardProps } from 'src/components/common/CardBlog/CardBlog'
import PaginationCommon from 'src/components/common/PaginationCommon/PaginationCommon'
import { useGetBlogList } from 'src/components/hooks/blog'
import { DEFAULT_BLOG_PAGE_SIZE, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils'
import { getPageFromQuery } from 'src/utils/funtion.utils'
import s from "./BlogsList.module.scss"

interface BlogsListProps {
    blogList?: BlogCardProps[],
    total?: number,
    idFeatured?:string
}



const BlogsList = ({ blogList,total,idFeatured }:BlogsListProps) => {

    const DEFAULT_BLOGS_ARGS = useMemo(()=> ({
        excludeBlogIds: [idFeatured],
        customOptions:{
            skip:0,
            take: DEFAULT_BLOG_PAGE_SIZE
        }
    }),[idFeatured]);


    const router = useRouter();


    const [initialQueryFlag, setInitialQueryFlag] = useState<boolean>(true)

    const [optionQueryBlog, setOptionQueryBlog] = useState<QueryBlogs>(DEFAULT_BLOGS_ARGS)
    const { blogs, totalItems } = useGetBlogList(optionQueryBlog);


    const onPageChange = (page:number) => {
        router.push({
            pathname: ROUTE.BLOGS,
            query: {
              ...router.query,
              [QUERY_KEY.PAGE]: page
            }
          },
            undefined, { shallow: true }
        )
    }

      // skip
      const firstRender = useRef(true);
      useEffect(() => {
        firstRender.current = false;
        const query = { ...DEFAULT_BLOGS_ARGS } as QueryBlogs;
        const page = getPageFromQuery(router.query[QUERY_KEY.PAGE] as string);
        query.customOptions.skip = page * DEFAULT_BLOG_PAGE_SIZE;
        window.scrollTo({
            top: 600,
            behavior: "smooth"
          });
          
        setOptionQueryBlog(query);
        setInitialQueryFlag(false);
    },[router.query,DEFAULT_BLOGS_ARGS])

       
    let data;
    if(initialQueryFlag == true){
        data = blogList;
    }else{
        data = blogs
    }
    

    return (
        <section>
            <div className={s.wrapper}>
                <div className={s.list}>
                    {
                        data?.map((product,index)=> {
                        return(
                                <div className={s.card} key={`${product.title}-${index}`}>
                                    {product.isPublish && <CardBlog {...product} /> }
                                </div>
                            )
                        })
                    }
                </div>
                <div className={s.pagination}>
                    <PaginationCommon total={totalItems !== undefined ? totalItems : total} pageSize={DEFAULT_BLOG_PAGE_SIZE} onChange={onPageChange}/>
                </div>
            </div>
        </section>
    )
}

export default BlogsList
