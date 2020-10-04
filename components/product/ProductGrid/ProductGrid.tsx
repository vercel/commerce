import cn from 'classnames'
import { FC } from 'react'
import s from './ProductGrid.module.css'
import ProductCard from '@components/product/ProductCard'
interface Props {
  className?: string
  children?: any
  products: [any] | any
  layout?: 'A' | 'B' | 'C' | 'D'
}

const ProductView: FC<Props> = ({ products, className, layout = 'A' }) => {
  const rootClassName = cn(
    s.root,
    {
      [s.layoutA]: layout === 'A',
      [s.layoutB]: layout === 'B',
      [s.layoutC]: layout === 'C',
      [s.layoutD]: layout === 'D',
    },
    className
  )
  return (
    <div className={rootClassName}>
      {products.map((data: any) => (
        <ProductCard productData={data.node} />
      ))}
    </div>
  )
}

export default ProductView
