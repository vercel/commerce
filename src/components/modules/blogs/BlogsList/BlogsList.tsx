import React, { useState } from 'react'
import CardBlog, { BlogCardProps } from 'src/components/common/CardBlog/CardBlog'
import PaginationCommon from 'src/components/common/PaginationCommon/PaginationCommon'
import s from "./BlogsList.module.scss"
import { DEFAULT_BLOG_PAGE_SIZE } from 'src/utils/constanst.utils'

interface BlogsListProps {
    data?: BlogCardProps[],
}

const BLOGSLIST_DATA = [
    {
      imageSrc: "https://user-images.githubusercontent.com/46085455/133185783-8100ef4e-7a72-4dc1-bb12-2ca46b56b393.png",
      title: "1",
      description: "The DEBM diet stands for "+"Delicious Happy Fun Diet"+". This diet was popularized by Robert...",
      slug: "happy-diet"
    },
    {
      imageSrc: "https://user-images.githubusercontent.com/46085455/133185911-df505d10-fdcd-4312-add3-7c62ad8af71e.png",
      title: "2",
      description: "Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
      slug: "happy-diet"
    },
    {
      imageSrc: "https://user-images.githubusercontent.com/46085455/133185959-7ad75580-ca6d-4684-83d9-3f64500bbc97.png",
      title: "3",
      description: "Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
      slug: "happy-diet"
    },
    {
      imageSrc: "https://user-images.githubusercontent.com/46085455/133186410-d8718d90-82fb-46cb-a0f2-0ec96356ae89.png",
      title: "4",
      description: "The DEBM diet stands for "+"Delicious Happy Fun Diet"+". This diet was popularized by Robert...",
      slug: "happy-diet"
    },
    {
      imageSrc: "https://user-images.githubusercontent.com/46085455/133186474-b2d89bbc-32ed-4174-a05e-3d388c0a39ff.png",
      title: "5",
      description: "Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
      slug: "happy-diet"
    },
    {
      imageSrc: "https://user-images.githubusercontent.com/46085455/133186545-d860f4ee-222c-4d72-a876-808af0f397a0.png",
      title: "6",
      description: "Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
      slug: "happy-diet"
    },
    {
      imageSrc: "https://user-images.githubusercontent.com/46085455/133185783-8100ef4e-7a72-4dc1-bb12-2ca46b56b393.png",
      title: "7",
      description: "The DEBM diet stands for "+"Delicious Happy Fun Diet"+". This diet was popularized by Robert...",
      slug: "happy-diet"
    },
    {
      imageSrc: "https://user-images.githubusercontent.com/46085455/133185911-df505d10-fdcd-4312-add3-7c62ad8af71e.png",
      title: "8",
      description: "Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
      slug: "happy-diet"
    },
    {
      imageSrc: "https://user-images.githubusercontent.com/46085455/133185959-7ad75580-ca6d-4684-83d9-3f64500bbc97.png",
      title: "9",
      description: "Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
      slug: "happy-diet"
    },
    {
      imageSrc: "https://user-images.githubusercontent.com/46085455/133186545-d860f4ee-222c-4d72-a876-808af0f397a0.png",
      title: "10",
      description: "Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
      slug: "happy-diet"
    },
    {
      imageSrc: "https://user-images.githubusercontent.com/46085455/133186410-d8718d90-82fb-46cb-a0f2-0ec96356ae89.png",
      title: "11",
      description: "The DEBM diet stands for "+"Delicious Happy Fun Diet"+". This diet was popularized by Robert...",
      slug: "happy-diet"
    },
    {
      imageSrc: "https://user-images.githubusercontent.com/46085455/133186474-b2d89bbc-32ed-4174-a05e-3d388c0a39ff.png",
      title: "12",
      description: "Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
      slug: "happy-diet"
    },
    {
      imageSrc: "https://user-images.githubusercontent.com/46085455/133185783-8100ef4e-7a72-4dc1-bb12-2ca46b56b393.png",
      title: "13",
      description: "The DEBM diet stands for "+"Delicious Happy Fun Diet"+". This diet was popularized by Robert...",
      slug: "happy-diet"
    },
    {
      imageSrc: "https://user-images.githubusercontent.com/46085455/133185911-df505d10-fdcd-4312-add3-7c62ad8af71e.png",
      title: "14",
      description: "Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
      slug: "happy-diet"
    },
    {
      imageSrc: "https://user-images.githubusercontent.com/46085455/133185959-7ad75580-ca6d-4684-83d9-3f64500bbc97.png",
      title: "15",
      description: "Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
      slug: "happy-diet"
    },
    {
      imageSrc: "https://user-images.githubusercontent.com/46085455/133186410-d8718d90-82fb-46cb-a0f2-0ec96356ae89.png",
      title: "16",
      description: "The DEBM diet stands for "+"Delicious Happy Fun Diet"+". This diet was popularized by Robert...",
      slug: "happy-diet"
    },
    {
      imageSrc: "https://user-images.githubusercontent.com/46085455/133186545-d860f4ee-222c-4d72-a876-808af0f397a0.png",
      title: "17",
      description: "Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
      slug: "happy-diet"
    },
    {
      imageSrc: "https://user-images.githubusercontent.com/46085455/133186474-b2d89bbc-32ed-4174-a05e-3d388c0a39ff.png",
      title: "18",
      description: "Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
      slug: "happy-diet"
    },
  
  ]

const BlogsList = ({ data = BLOGSLIST_DATA }:BlogsListProps) => {
    const [currentPage, setCurrentPage] = useState(0)
    const onPageChange = (page:number) => {
        setCurrentPage(page)
    }
    
    return (
        <section>
            <div className={s.wrapper}>
                <div className={s.list}>
                    {
                        data.slice(currentPage*DEFAULT_BLOG_PAGE_SIZE,(currentPage+1)*DEFAULT_BLOG_PAGE_SIZE).map((product,index)=> {
                            return(
                                <div className={s.card} key={`${product.title}-${index}`}>
                                    <CardBlog {...product} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className={s.pagination}>
                    <PaginationCommon total={data.length} pageSize={DEFAULT_BLOG_PAGE_SIZE} onChange={onPageChange}/>
                </div>
            </div>
        </section>
    )
}

export default BlogsList