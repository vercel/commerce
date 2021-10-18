import { ProductCard } from '@commerce/types/product'
import Link from 'next/link'
import React from 'react'
import { IconBuy } from 'src/components/icons'
import { ROUTE } from 'src/utils/constanst.utils'
import { ImgWithLink } from '..'
import ButtonCommon from '../ButtonCommon/ButtonCommon'
import ButtonIconBuy from '../ButtonIconBuy/ButtonIconBuy'
import ItemWishList from '../ItemWishList/ItemWishList'
import LabelCommon from '../LabelCommon/LabelCommon'
import s from './ProductCard.module.scss'
import ProductNotSell from './ProductNotSell/ProductNotSell'
import {useAddProductToCart} from "../../hooks/cart"
import { useCartDrawer } from 'src/components/contexts'
import Router from 'next/router'
export interface ProductCardProps extends ProductCard {
  buttonText?: string
  isSingleButton?: boolean,
  activeWishlist?:boolean
}

const ProductCardComponent = ({
  id,
  collection,
  name,
  slug,
  weight,
  price,
  currencyCode,
  buttonText = 'Buy Now',
  imageSrc,
  isNotSell,
  isSingleButton,
  productVariantId,
  productVariantName,
  activeWishlist
}: ProductCardProps) => {

  const {addProduct,loading} = useAddProductToCart()
  const { openCartDrawer } = useCartDrawer()

  const handleAddToCart = () => {
    if(productVariantId){
      addProduct({variantId:productVariantId,quantity:1},handleAddToCartCallback)
    }
  }
  const handleAddToCartCallback = () => {
    openCartDrawer && openCartDrawer()
  }

  const handleBuyNowCallback = (success:boolean) => {
    if(success){
      Router.push(ROUTE.CHECKOUT)
    }
  }

  const handleBuyNow = () => {
    if(productVariantId){
      addProduct({variantId:productVariantId,quantity:1},handleBuyNowCallback)
    }
  }

  if (isNotSell) {
    return <div className={`${s.productCardWarpper} ${s.notSell}`}>
      <ProductNotSell name={name} imageSrc={imageSrc} />
    </div>
  }

 
  return (
    <div className={s.productCardWarpper}>
      <div className={s.cardTop}>
        <Link href={`${ROUTE.PRODUCT_DETAIL}/${slug}`}>
          <a>
            <div className={s.productImage}>
              <ImgWithLink src={imageSrc} alt={name}/>
            </div>
          </a>
        </Link>
        {
          collection &&
        <div className={s.productLabel}>
          <LabelCommon shape="half">{collection}</LabelCommon>
        </div>
        }
      </div>
      <div className={s.cardMid}>
        <div className={s.cardMidTop}>
          <Link href={`${ROUTE.PRODUCT_DETAIL}/${slug}`}>
            <a>
              <div className={s.productname}>{productVariantName} </div>
            </a>
          </Link>
          <div className={s.productWeight}>{weight}</div>
        </div>
        <div className={s.cardMidBot}>
          <div className={s.productPrice}>{price} {currencyCode}</div>
          <div className={s.wishList}>
            <ItemWishList isActive={activeWishlist}  id={id}/>
          </div>
        </div>
      </div>
      <div className={s.cardBot}>
        {
          isSingleButton ?
            <div className={s.cardButton}>
              <ButtonCommon type="light" icon={<IconBuy />} size='small' onClick={handleAddToCart}>Add to cart</ButtonCommon>
            </div>
            :
            <>
              <div className={s.cardIcon} >
                <ButtonIconBuy onClick={handleAddToCart} loading={loading}/>
              </div>
              <div className={s.cardButton}>
                <ButtonCommon type="light" size='small' onClick={handleBuyNow}>{buttonText}</ButtonCommon>
              </div>
            </>
        }

      </div>
    </div>
  )
}

export default ProductCardComponent
