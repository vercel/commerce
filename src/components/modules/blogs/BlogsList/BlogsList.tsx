import React, { useState } from 'react'
import CardBlog, { BlogCardProps } from 'src/components/common/CardBlog/CardBlog'
import PaginationCommon from 'src/components/common/PaginationCommon/PaginationCommon'
import s from "./BlogsList.module.scss"

interface BlogsListProps {
    data: BlogCardProps[],
}

const BlogsList = ({ data }:BlogsListProps) => {
    const [currentPage, setCurrentPage] = useState(0)
    const onPageChange = (page:number) => {
        setCurrentPage(page)
    }
    return (
        <section>
            <div className={s.wrapper}>
                <div className={s.list}>
                    {
                        data.slice(currentPage*6,(currentPage+1)*6).map((product,index)=>{
                            return(
                                <div className={s.card}>
                                    <CardBlog {...product} key={index}/>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={s.pagination}>
                    <PaginationCommon total={data.length} pageSize={6} onChange={onPageChange}/>
                </div>
            </div>
        </section>
    )
}

export default BlogsList