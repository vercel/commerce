import { BlogsList, FeaturedCardBlog, BlogHeading, BlogBreadCrumb } from 'src/components/modules/blogs';

const BlogsPage = () => {
    return(
        <>
            <BlogBreadCrumb />
            <BlogHeading />
            <FeaturedCardBlog />
            <BlogsList />
        </>
    )
}
export default BlogsPage