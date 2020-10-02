import cn from 'classnames'
import s from './ProductCard.module.css'
import { FC } from 'react'
import { Heart } from '@components/icon'
interface Props {
  className?: string
  children?: any
}

const ProductCard: FC<Props> = ({ className }) => {
  const rootClassName = cn(s.root, className)
  return (
    <div className={rootClassName}>
      <div className="">
        <h1 className="px-8 py-2 bg-white text-black font-bold text-2xl">
          T-Shirt
        </h1>
        <div className="px-6 py-1 pb-3 bg-white text-black font-semibold inline-block text-sm leading-6">
          $50
        </div>
      </div>
      <div className="flex items-center justify-center h-12 w-12 bg-white text-black cursor-pointer">
        <Heart />
      </div>
    </div>
  )
}

export default ProductCard
