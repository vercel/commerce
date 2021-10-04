import { ProductCard } from '@commerce/types/product'
import Link from 'next/link'
import React from 'react'
import { ROUTE } from 'src/utils/constanst.utils'
import { ImgWithLink } from '..'
import { LANGUAGE } from '../../../utils/language.utils'
import ButtonCommon from '../ButtonCommon/ButtonCommon'
import ButtonIconBuy from '../ButtonIconBuy/ButtonIconBuy'
import s from './FeaturedProductCard.module.scss'
export interface FeaturedProductCardProps extends ProductCard {
  buttonText?: string
  featuredFacetId?: string,
}

const FeaturedProductCard = ({
  imageSrc,
  name,
  slug,
  price,
  currencyCode,
  buttonText = LANGUAGE.BUTTON_LABEL.BUY_NOW,
}: FeaturedProductCardProps) => {
  return (
    <div className={s.featuredProductCardWarpper}>
      <div className={s.left}>
        <Link href={`${ROUTE.PRODUCT_DETAIL}/${slug}`}>
          <a>
            <ImgWithLink src={imageSrc} alt={name} />
          </a>
        </Link>
      </div>
      <div className={s.right}>
        <div className={s.rightTop}>
          <Link href={`${ROUTE.PRODUCT_DETAIL}/${slug}`}>
            <a>
              <div className={s.title}>{name}</div>
            </a>
          </Link>

          {/* TODO: */}
          {/* <div className={s.subTitle}>{subTitle}</div> */}
          <div className={s.priceWrapper}>
            <div className={s.price}>{price} {currencyCode}</div>
            {/* TODO: */}
            {/* <div className={s.originPrice}>{originPrice} </div> */}
          </div>
        </div>
        <div className={s.buttonWarpper}>
          <div className={s.icon}>
            <ButtonIconBuy size='default' />
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
