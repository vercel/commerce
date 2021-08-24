import React from 'react'
import ButtonCommon from '../ButtonCommon/ButtonCommon'
import ButtonIconBuy from '../ButtonIconBuy/ButtonIconBuy'
import ItemWishList from '../ItemWishList/ItemWishList'
import LabelCommon from '../LabelCommon/LabelCommon'
import s from './ProductCard.module.scss'

interface ProductCardProps {
  category: string
  name: string
  weight: string
  price: string
  buttonText?: string
  imageSrc: string
}

const ProductCard = ({
  category,
  name,
  weight,
  price,
  buttonText = 'Buy Now',
  imageSrc,
}: ProductCardProps) => {
  return (
    <section className={s.productCardWarpper}>
      <section className={s.cardTop}>
        <div className={s.productImage}>
          <img src={imageSrc} alt="image" />
          <div className={s.productLabel}>
            <LabelCommon shape="half">{category}</LabelCommon>
          </div>
        </div>
      </section>
      <section className={s.cardMid}>
        <div className={s.cardMidTop}>
          <div className={s.productname}>{name} </div>
          <div className={s.productWeight}>{weight}</div>
        </div>
        <div className={s.cardMidBot}>
          <div className={s.productPrice}>{price}</div>
          <div className={s.wishList}>
            <ItemWishList />
          </div>
        </div>
      </section>
      <section className={s.cardBot}>
        <div className={s.cardIcon}>
          <ButtonIconBuy/>
        </div>
        <div className={s.cardButton}>
          <ButtonCommon type="ghost">{buttonText}</ButtonCommon>
        </div>
      </section>
    </section>
  )
}

export default ProductCard
