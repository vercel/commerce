import React from 'react'
import { ProductCarousel } from 'src/components/common'
import { SPICE_DATA_TEST } from "../../../../utils/demo-data"
import s from './HomeSpice.module.scss'
import { ProductCard } from '@commerce/types/product'
interface HomeSpice {
  data: ProductCard[]
}


const HomeSpice = ({data}: HomeSpice) => {
  return (
    <div className={s.homeSpiceWarpper}>
        <ProductCarousel data={data} itemKey="product-7"/>
    </div>
  )
}

export default HomeSpice
