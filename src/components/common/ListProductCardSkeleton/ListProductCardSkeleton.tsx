import classNames from 'classnames'
import { ProductCardSkeleton } from '..'
import s from './ListProductCardSkeleton.module.scss'

type Props = {
  count?: number
  isWrap?: boolean
}
const ListProductCardSkeleton = ({ count = 3, isWrap }: Props) => {

  return (
    <div className={classNames(s.listProductCardSkeleton, { [s.wrap]: isWrap })}>
      {
        Array.from(Array(count).keys()).map(item => <ProductCardSkeleton key={item} />)

      }
    </div>
  )
}

export default ListProductCardSkeleton
