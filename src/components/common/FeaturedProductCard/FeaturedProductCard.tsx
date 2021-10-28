import { ProductCard } from '@commerce/types/product'
import { Facet, FacetValue } from '@framework/schema'
import Link from 'next/link'
import router from 'next/router'
import React, { useState } from 'react'
import { useCartDrawer, useMessage } from 'src/components/contexts'
import { useActiveCustomer } from 'src/components/hooks/auth'
import { useAddProductToCart, useGetActiveOrder } from 'src/components/hooks/cart'
import useChangeOrderState from 'src/components/hooks/order/useChangeOrderState'
import { ROUTE } from 'src/utils/constanst.utils'
import { ImgWithLink } from '..'
import { LANGUAGE } from '../../../utils/language.utils'
import ButtonCommon from '../ButtonCommon/ButtonCommon'
import ButtonIconBuy from '../ButtonIconBuy/ButtonIconBuy'
import s from './FeaturedProductCard.module.scss'
export interface FeaturedProductCardProps extends ProductCard {
  buttonText?: string,
  subText?: string,
}

const FeaturedProductCard = ({
  imageSrc,
  name,
  slug,
  price,
  subText,
  currencyCode,
  buttonText = LANGUAGE.BUTTON_LABEL.BUY_NOW,
  productVariantId
}: FeaturedProductCardProps) => {
  
  const {addProduct} = useAddProductToCart()
  const { openCartDrawer } = useCartDrawer()
  const { customer } = useActiveCustomer()
  const { order } = useGetActiveOrder()
  const [addToCartLoading, setAddToCartLoading] = useState(false)
  const [buyNowLoading, setBuyNowLoading] = useState(false)
	const { showMessageSuccess, showMessageError } = useMessage()
  const {changeOrderState, loading:changeStateLoading } = useChangeOrderState()
  const [mode, setMode] = useState("handleAddToCart")
  const handleAddToCart = () => {
    setAddToCartLoading(true)
    if(order && order.state !== "AddingItems"){
      setMode("handleAddToCart")
      changeOrderState("AddingItems",onChangeOrderStateCallback)
    }else if(productVariantId){
      addProduct({variantId:productVariantId,quantity:1},handleAddToCartCallback)
    }
  }
  const handleAddToCartCallback = (isSuccess:boolean,message?:string) => {
		setAddToCartLoading(false)
		if(isSuccess){
			showMessageSuccess("Add to cart successfully!", 4000)
			openCartDrawer && openCartDrawer()
		}else{
			showMessageError(message||"Error")
		}
  }

    const handleBuyNowCallback = (success:boolean,message?:string) => {
      setBuyNowLoading(false)
      if(success){
          router.push(ROUTE.CHECKOUT)
      }else{
        showMessageError(message||"Error")
      }
    }

  const handleBuyNow = () => {
    setBuyNowLoading(true)
    if(order && order.state !== "AddingItems"){
      setMode("handleBuyNow")
      changeOrderState("AddingItems",onChangeOrderStateCallback)
    }else if(productVariantId){
      addProduct({variantId:productVariantId,quantity:1},handleBuyNowCallback)
    }
  }

  const onChangeOrderStateCallback = (isSuccess:boolean, message?:string) => {
    if(isSuccess){
      showMessageSuccess("Add to cart successfully!", 4000)
      mode === "handleBuyNow" ? handleBuyNow() :handleAddToCart()
    }else{
			showMessageError(message||"Error")
    }
  }

  
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
          <div className={s.subTitle}>{subText}</div>
          <div className={s.priceWrapper}>
            <div className={s.price}>{price} {currencyCode}</div>
            {/* TODO: */}
            {/* <div className={s.originPrice}>{originPrice} </div> */}
          </div>
        </div>
        <div className={s.buttonWarpper}>
          <div className={s.icon}>
            <ButtonIconBuy size='default'  onClick={handleAddToCart}  loading={addToCartLoading} disabled={buyNowLoading}/>
          </div>
          <div className={s.button}>
            <ButtonCommon  onClick={handleBuyNow} loading={buyNowLoading} disabled={addToCartLoading}>{buttonText}</ButtonCommon>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProductCard
