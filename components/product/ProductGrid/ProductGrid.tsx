import cn from 'classnames'
import { FC } from 'react'
import s from './ProductGrid.module.css'
import ProductCard from '@components/product/ProductCard'
interface Props {
  className?: string
  children?: any
  products: [any]
}

const ProductView: FC<Props> = ({ products, className }) => {
  const rootClassName = cn(s.root, className)
  return (
    <div className={rootClassName}>
      {products.slice(0, 6).map((p) => (
        <ProductCard {...p} />
      ))}
    </div>
  )
}

export default ProductView
