import cn from 'classnames'
import React, { FC } from 'react'
import s from './ProductGrid.module.css'
import ProductCard from '@components/ProductCard'
interface Props {
  className?: string
  children?: any
  products: [any]
}

const ProductView: FC<Props> = ({ products, className }) => {
  const rootClassName = cn(s.root, className)
  return (
    <div className={rootClassName}>
      <div className="row-span-2 lg:col-span-2 bg-violet h-full"></div>
      <div className="row-span-1 lg:col-span-1 bg-black h-full"></div>
      <div className="row-span-1 lg:col-span-1 bg-pink"></div>
      <div className="row-span-1 lg:col-span-1 bg-black h-full"></div>
      <div className="row-span-2 lg:col-span-2 bg-blue h-full"></div>
      <div className="row-span-1 lg:col-span-1 bg-cyan"></div>
    </div>
  )
}

export default ProductView
