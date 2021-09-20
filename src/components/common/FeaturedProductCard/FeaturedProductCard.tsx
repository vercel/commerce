import React from 'react'
import { FeaturedProductProps } from 'src/utils/types.utils'
import s from './FeaturedProductCard.module.scss'
import { LANGUAGE } from '../../../utils/language.utils'
import ButtonIconBuy from '../ButtonIconBuy/ButtonIconBuy'
import ButtonCommon from '../ButtonCommon/ButtonCommon'
import { ImgWithLink } from '..'
export interface FeaturedProductCardProps extends FeaturedProductProps {
  buttonText?: string
}

const FeaturedProductCard = ({
  imageSrc,
  title,
  subTitle,
  price,
  originPrice,
  buttonText = LANGUAGE.BUTTON_LABEL.BUY_NOW,
}: FeaturedProductCardProps) => {
  return (
    <div className={s.featuredProductCardWarpper}>
      <div className={s.left}>
        <ImgWithLink src={imageSrc} alt={title}/>
      </div>
      <div className={s.right}>
        <div className={s.rightTop}>
          <div className={s.title}>{title}</div>
          <div className={s.subTitle}>{subTitle}</div>
          <div className={s.priceWrapper}>
            <div className={s.price}>{price} </div>
            <div className={s.originPrice}>{originPrice} </div>
          </div>
        </div>
        <div className={s.buttonWarpper}>
          <div className={s.icon}>
            <ButtonIconBuy size='default'/>
          </div>
          <div className={s.button}>
            <ButtonCommon>{buttonText}</ButtonCommon>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProductCard
