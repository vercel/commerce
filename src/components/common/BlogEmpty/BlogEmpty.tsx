
import { EmptyCommon } from '..';
import s from './BlogEmpty.module.scss';


interface Props {
    
}

const BlogEmpty = ({ }: Props) => {
    return (
        <div className={s.blogEmpty}>
           <EmptyCommon/>
        </div>
    )
}

export default BlogEmpty