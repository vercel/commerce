import { ProductCard } from '@commerce/types/product'
import Link from 'next/link'
import Router from 'next/router'
import React, { useState } from 'react'
import { useCartDrawer, useMessage } from 'src/components/contexts'
import useGetActiveOrder from 'src/components/hooks/cart/useGetActiveOrder'
import useChangeOrderState from 'src/components/hooks/order/useChangeOrderState'
import { IconBuy } from 'src/components/icons'
import { ROUTE } from 'src/utils/constanst.utils'
import { ImgWithLink } from '..'
import { useAddProductToCart } from "../../hooks/cart"
import ButtonCommon from '../ButtonCommon/ButtonCommon'
import ButtonIconBuy from '../ButtonIconBuy/ButtonIconBuy'
import ItemWishList from '../ItemWishList/ItemWishList'
import LabelCommon from '../LabelCommon/LabelCommon'
import s from './ProductCard.module.scss'
import ProductNotSell from './ProductNotSell/ProductNotSell'
export interface ProductCardProps extends ProductCard {
  buttonText?: string
  isSingleButton?: boolean,
  activeWishlist?:boolean
  onAddToCartCallBack ?: () => void
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
  isNotSell = false,
  isSingleButton,
  productVariantId,
  productVariantName,
  onAddToCartCallBack
}: ProductCardProps) => {

  const {addProduct} = useAddProductToCart()
  const { openCartDrawer } = useCartDrawer()
  const [addToCartLoading, setAddToCartLoading] = useState(false)
  const [buyNowLoading, setBuyNowLoading] = useState(false)
	const { showMessageSuccess, showMessageError } = useMessage()
  const { order } = useGetActiveOrder()
  const {changeOrderState } = useChangeOrderState()
  const [mode, setMode] = useState<"handleBuyNow"|"handleAddToCart">("handleAddToCart")
  const handleAddToCart = () => {
    setAddToCartLoading(true)
    if(order && order.state !== "AddingItems"){
      changeOrderState("AddingItems",onChangeOrderStateCallback)
    }else if(productVariantId){
      addProduct({variantId:productVariantId,quantity:1},handleAddToCartCallback)
    }
  }
  const handleAddToCartCallback = (isSuccess:boolean,message?:string) => {
		setAddToCartLoading(false)
		if(isSuccess){
      showMessageSuccess("Add to cart successfully!", 4000)
      onAddToCartCallBack && onAddToCartCallBack()
			openCartDrawer && openCartDrawer()
		}else{
			showMessageError(message||"Error")
		}
  }

    const handleBuyNowCallback = (success:boolean,message?:string) => {
      setBuyNowLoading(false)
      if(success){
          Router.push(ROUTE.CHECKOUT)
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
      // mode === "handleBuyNow" ? handleBuyNow() :handleAddToCart()
      if(mode==="handleAddToCart"){
        if(productVariantId){
          addProduct({variantId:productVariantId,quantity:1},handleAddToCartCallback)
        }
      }else{
        if(productVariantId){
          addProduct({variantId:productVariantId,quantity:1},handleBuyNowCallback)
        }
      }
    }else{
			showMessageError(message||"Error")
    }
  }

  if (isNotSell) {
    return <div className={`${s.productCardWarpper} ${s.notSell}`}>
      <ProductNotSell name={name ?? null} imageSrc={imageSrc ?? null} />
    </div>
  }
  

  return (
    <>
      <div className={s.productCardWarpper}>
        <div className={s.cardTop}>
          <Link href={`${ROUTE.PRODUCT_DETAIL}/${slug}`}>
            <a>
              <div className={s.productImage}>
                <ImgWithLink src={imageSrc ?? ''} alt={name ?? ''}/>
              </div>
            </a>
          </Link>
          {
            collection &&
          <div className={s.productLabel}>
            <LabelCommon shape="half">{collection}</LabelCommon>
          </div>
          }
          <div className={s.productWeight}>{weight}</div>
        </div>
        <div className={s.cardMidBot}>
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
              <ItemWishList id={id ?? ''} />
            </div>
          </div>
        </div>
        <div className={s.cardBot}>
          {
            isSingleButton ?
              <div className={s.cardButton}>
                <ButtonCommon type="light" icon={<IconBuy />} size='small' onClick={handleAddToCart}  loading={addToCartLoading} disabled={buyNowLoading}>Add to cart</ButtonCommon>
              </div>
              :
              <>
                <div className={s.cardIcon} >
                  <ButtonIconBuy onClick={handleAddToCart}  loading={addToCartLoading} disabled={buyNowLoading}/>
                </div>
                <div className={s.cardButton}>
                  <ButtonCommon type="light" size='small' onClick={handleBuyNow} loading={buyNowLoading} disabled={addToCartLoading}>{buttonText}</ButtonCommon>
                </div>
              </>
          }
        </div>
      </div>
    </>
  )
}

export default ProductCardComponent
