import { Layout } from 'src/components/common';
import { BlogsList, FeaturedCardBlog, BlogHeading, BlogBreadCrumb } from 'src/components/modules/blogs';

export default function BlogsPage() {
    return(
        <>
            <BlogBreadCrumb />
            <BlogHeading />
            <FeaturedCardBlog />
            <BlogsList />
        </>
    )
}
BlogsPage.Layout = Layout