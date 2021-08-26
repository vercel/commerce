import React from 'react'
import { CollectionHeading, ProductCaroucel, ViewAllItem } from 'src/components/common'
import { ProductCardProps } from 'src/components/common/ProductCard/ProductCard'
import s from './CollectionCarcoucel.module.scss'
interface ColectionCarcoucelProps {
  data: ProductCardProps[]
  itemKey: string
  title: string
  subTitle: string
  viewAllLink?: string
}

const ColectionCarcoucel = ({
  data,
  itemKey,
  title,
  subTitle,
}: ColectionCarcoucelProps) => {
  return (
    <div className={s.colectionCarcoucelWarpper}>
      <div className={s.top}>
        <div className={s.left}>
          <CollectionHeading headingText={title} subtitle={subTitle} />
        </div>
        <div className={s.right}>
          <ViewAllItem/>
        </div>
      </div>
      <div className={s.bot}>
        <ProductCaroucel data={data} itemKey={itemKey} />
      </div>
    </div>
  )
}

export default ColectionCarcoucel
