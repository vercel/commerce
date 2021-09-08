import React, { useState } from 'react'
import CardBlog, { BlogCardProps } from 'src/components/common/CardBlog/CardBlog'
import PaginationCommon from 'src/components/common/PaginationCommon/PaginationCommon'
import s from "./BlogsList.module.scss"
import image15 from '../../../../../public/assets/images/image15.png'
import image16 from '../../../../../public/assets/images/image16.png'
import image17 from '../../../../../public/assets/images/image17.png'
import image21 from '../../../../../public/assets/images/image21.png'
import image22 from '../../../../../public/assets/images/image22.png'
import image23 from '../../../../../public/assets/images/image23.png'

interface BlogsListProps {
    data?: BlogCardProps[],
}

const BLOGSLIST_DATA = [
    {
      imageSrc: image15.src,
      title: "1",
      description: "The DEBM diet stands for "+"Delicious Happy Fun Diet"+". This diet was popularized by Robert...",
      slug: "happy-diet"
    },
    {
      imageSrc: image16.src,
      title: "2",
      description: "Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
      slug: "happy-diet"
    },
    {
      imageSrc: image17.src,
      title: "3",
      description: "Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
      slug: "happy-diet"
    },
    {
      imageSrc: image21.src,
      title: "4",
      description: "The DEBM diet stands for "+"Delicious Happy Fun Diet"+". This diet was popularized by Robert...",
      slug: "happy-diet"
    },
    {
      imageSrc: image22.src,
      title: "5",
      description: "Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
      slug: "happy-diet"
    },
    {
      imageSrc: image23.src,
      title: "6",
      description: "Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
      slug: "happy-diet"
    },
    {
      imageSrc: image15.src,
      title: "7",
      description: "The DEBM diet stands for "+"Delicious Happy Fun Diet"+". This diet was popularized by Robert...",
      slug: "happy-diet"
    },
    {
      imageSrc: image16.src,
      title: "8",
      description: "Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
      slug: "happy-diet"
    },
    {
      imageSrc: image17.src,
      title: "9",
      description: "Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
      slug: "happy-diet"
    },
    {
      imageSrc: image23.src,
      title: "10",
      description: "Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
      slug: "happy-diet"
    },
    {
      imageSrc: image21.src,
      title: "11",
      description: "The DEBM diet stands for "+"Delicious Happy Fun Diet"+". This diet was popularized by Robert...",
      slug: "happy-diet"
    },
    {
      imageSrc: image22.src,
      title: "12",
      description: "Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
      slug: "happy-diet"
    },
    {
      imageSrc: image15.src,
      title: "13",
      description: "The DEBM diet stands for "+"Delicious Happy Fun Diet"+". This diet was popularized by Robert...",
      slug: "happy-diet"
    },
    {
      imageSrc: image16.src,
      title: "14",
      description: "Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
      slug: "happy-diet"
    },
    {
      imageSrc: image17.src,
      title: "15",
      description: "Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
      slug: "happy-diet"
    },
    {
      imageSrc: image21.src,
      title: "16",
      description: "The DEBM diet stands for "+"Delicious Happy Fun Diet"+". This diet was popularized by Robert...",
      slug: "happy-diet"
    },
    {
      imageSrc: image23.src,
      title: "17",
      description: "Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
      slug: "happy-diet"
    },
    {
      imageSrc: image22.src,
      title: "18",
      description: "Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
      slug: "happy-diet"
    },
  
  ]

const BlogsList = ({ data = BLOGSLIST_DATA }:BlogsListProps) => {
    const defaultBlogPageSize: number = 6;
    const [currentPage, setCurrentPage] = useState(0)
    const onPageChange = (page:number) => {
        setCurrentPage(page)
    }
    return (
        <section>
            <div className={s.wrapper}>
                <div className={s.list}>
                    {
                        data.slice(currentPage*defaultBlogPageSize,(currentPage+1)*defaultBlogPageSize).map((product,index)=>{
                            return(
                                <div className={s.card}>
                                    <CardBlog {...product} key={index}/>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={s.pagination}>
                    <PaginationCommon total={data.length} pageSize={defaultBlogPageSize} onChange={onPageChange}/>
                </div>
            </div>
        </section>
    )
}

export default BlogsList