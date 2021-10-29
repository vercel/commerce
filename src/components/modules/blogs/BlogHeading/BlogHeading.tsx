import { HeadingCommon } from "src/components/common"
import s from './BlogHeading.module.scss'

interface BlogHeadingProps {
    children?: React.ReactNode,
    heading?: string,
}

const BlogHeading = ({heading = "BLOGS"}: BlogHeadingProps) => {
    return (
        <section className={s.headingWrapper}>
            <div className={s.heading}>
                <HeadingCommon>{heading}</HeadingCommon>
            </div>
        </section>
    )
}
export default BlogHeading