import Link from 'next/link'
import React from 'react'
import { ROUTE } from 'src/utils/constanst.utils'
import { ProductProps } from 'src/utils/types.utils'
import ButtonCommon from '../ButtonCommon/ButtonCommon'
import ButtonIconBuy from '../ButtonIconBuy/ButtonIconBuy'
import ItemWishList from '../ItemWishList/ItemWishList'
import LabelCommon from '../LabelCommon/LabelCommon'
import s from './ProductCard.module.scss'
import ProductNotSell from './ProductNotSell/ProductNotSell'

export interface ProductCardProps extends ProductProps {
  buttonText?: string
}

const ProductCard = ({
  category,
  name,
  weight,
  price,
  buttonText = 'Buy Now',
  imageSrc,
  isNotSell,
}: ProductCardProps) => {
  if (isNotSell) {
    return <div className={`${s.productCardWarpper} ${s.notSell}`}>
      <ProductNotSell name={name} imageSrc={imageSrc} />
    </div>

  }

  return (
    <div className={s.productCardWarpper}>
      <div className={s.cardTop}>
        <Link href={`${ROUTE.PRODUCT_DETAIL}/test`}>
          <div className={s.productImage}>
            <img src={imageSrc} alt="image" />
          </div>
        </Link>
        <div className={s.productLabel}>
          <LabelCommon shape="half">{category}</LabelCommon>
        </div>
      </div>
      <div className={s.cardMid}>
        <div className={s.cardMidTop}>
          <Link href={`${ROUTE.PRODUCT_DETAIL}/test`}>
            <div className={s.productname}>{name} </div>
          </Link>
          <div className={s.productWeight}>{weight}</div>
        </div>
        <div className={s.cardMidBot}>
          <div className={s.productPrice}>{price}</div>
          <div className={s.wishList}>
            <ItemWishList />
          </div>
        </div>
      </div>
      <div className={s.cardBot}>
        <div className={s.cardIcon}>
          <ButtonIconBuy />
        </div>
        <div className={s.cardButton}>
          <ButtonCommon type="light">{buttonText}</ButtonCommon>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
