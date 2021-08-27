import React from 'react'
import {
  CollectionHeading,
  ProductCaroucel,
  ViewAllItem,
} from 'src/components/common'
import { CollectionHeadingProps } from 'src/components/common/CollectionHeading/CollectionHeading'
import { ProductCardProps } from 'src/components/common/ProductCard/ProductCard'
import s from './CollectionCarcoucel.module.scss'
interface ColectionCarcoucelProps extends CollectionHeadingProps {
  data: ProductCardProps[]
  itemKey: string
  viewAllLink?: string
}

const ColectionCarcoucel = ({
  data,
  itemKey,
  title,
  subtitle,
  type
}: ColectionCarcoucelProps) => {
  return (
    <div className={s.colectionCarcoucelWarpper}>
      <div className={s.top}>
        <div className={s.left}>
          <CollectionHeading
            type={type}
            subtitle={subtitle}
            title={title}
          ></CollectionHeading>
        </div>
        <div className={s.right}>
          <ViewAllItem link="#"/>
        </div>
      </div>
      <div className={s.bot}>
        <ProductCaroucel data={data} itemKey={itemKey} />
      </div>
    </div>
  )
}

export default ColectionCarcoucel
