import React from 'react'
import { ProductCarousel } from 'src/components/common'
import { SPICE_DATA_TEST } from "../../../../utils/demo-data"
import s from './HomeSpice.module.scss'

interface HomeSpice {
  
}


const HomeSpice = ({}: HomeSpice) => {
  return (
    <div className={s.homeSpiceWarpper}>
        <ProductCarousel data={SPICE_DATA_TEST} itemKey="product-7"/>
    </div>
  )
}

export default HomeSpice
