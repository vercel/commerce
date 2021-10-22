import classNames from 'classnames'
import { ProductCardSkeleton } from '..'
import s from './ListBlogCardSkeleton.module.scss'

type Props = {
  count?: number
  isWrap?: boolean,
}
const ListBlogCardSkeleton = ({ count = 3, isWrap }: Props) => {

  return (
    <div className={classNames(s.listBlogCardSkeleton, { [s.wrap]: isWrap })}>
      {
        Array.from(Array(count).keys()).map(item => <ProductCardSkeleton key={item}  />)
      }
    </div>
  )
}

export default ListBlogCardSkeleton
