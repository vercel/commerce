import classNames from 'classnames'
import { ProductCardSkeleton } from '..'
import s from './ListProductCardSkeleton.module.scss'

type Props = {
  count?: number
  isWrap?: boolean,
  isBlog?:boolean
}
const ListProductCardSkeleton = ({ count = 3, isWrap,isBlog=false }: Props) => {

  return (
    <div className={classNames(s.listProductCardSkeleton, { [s.wrap]: isWrap }, { [s.isBlog]: isBlog })}>
      {
        Array.from(Array(count).keys()).map(item => <ProductCardSkeleton key={item} isBlog={isBlog} />)

      }
    </div>
  )
}

export default ListProductCardSkeleton
