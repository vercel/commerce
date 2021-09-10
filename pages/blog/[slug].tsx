import { Layout, RelevantBlogPosts } from 'src/components/common';
import BlogContent from 'src/components/modules/blog-detail/BlogContent/BlogContent';
import BlogDetailImg from 'src/components/modules/blog-detail/BlogDetailImg/BlogDetailImg';
import { RECIPE_DATA_TEST } from 'src/utils/demo-data'


export default function BlogDetailPage() {
  return (
    <>
        <BlogDetailImg/>
        <BlogContent/>
        <RelevantBlogPosts data={RECIPE_DATA_TEST} title="You will like also" bgcolor="cream"/>
    </>
  )
}

BlogDetailPage.Layout = Layout
