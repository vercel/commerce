import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ModalConfirm, QuanittyInput } from 'src/components/common'
import { IconDelete } from 'src/components/icons'
import { ROUTE } from 'src/utils/constanst.utils'
import ImgWithLink from '../../../ImgWithLink/ImgWithLink'
import LabelCommon from '../../../LabelCommon/LabelCommon'
import s from './ProductCartItem.module.scss'
import { LineItem } from '@commerce/types/cart'
import { useGetActiveOrder, useUpdateProductInCart } from 'src/components/hooks/cart'
import { debounce } from 'lodash'
import useRemoveProductInCart from 'src/components/hooks/cart/useRemoveProductInCart'
import { useMessage } from 'src/components/contexts'
import { useGetUserOrder } from 'src/components/hooks/account'
import useChangeOrderState from 'src/components/hooks/order/useChangeOrderState'

export interface ProductCartItempProps extends LineItem {
  currency: { code: string }
}

const ProductCartItem = ({
  slug,
  discounts,
  quantity,
  variant,
  name,
  currency,
  id,
}: ProductCartItempProps) => {
  const [visible, setVisible] = useState(false)
  const {updateProduct} = useUpdateProductInCart()
  const {removeProduct, loading} = useRemoveProductInCart()
	const {showMessageSuccess, showMessageError } = useMessage()
  const { mutate: mutateUserOrder } = useGetUserOrder();
  const { order } = useGetActiveOrder()
  const {changeOrderState } = useChangeOrderState()
  const [quantityValue] = useState(quantity)
  // const [discountSum, setDiscountSum] = useState(0)

  // useEffect(() => {
  //   let sum = discounts.reduce((previousValue, currentValue) => previousValue + currentValue.value,0)
  //   setDiscountSum((Math.round(sum*100))/100)
  // }, [discounts])
  // const handleQuantityChangeCallback = (isSuccess:boolean,mess?:string) => {
  //   if(!isSuccess){
  //     // console.log(mess)
  //     showMessageError()
  //   }
  // }
  const handleRemoveCallback = (isSuccess: boolean, mess?: string) => {
    if (!isSuccess) {
      showMessageError()
    } else {
      showMessageSuccess('Remove success')
      setVisible(false)
      mutateUserOrder()
    }
  }

  // const debounceFn = useCallback((value:Number)=>{
  //   const handleQuantityChangeCallback = (isSuccess:boolean,mess?:string) => {
  //     if(!isSuccess){
  //       // console.log(mess)
  //       showMessageError()
  //     }
  //   }
  //   const handleQuantityChange = (value:number) => {
  //     updateProduct({orderLineId:id,quantity:value},handleQuantityChangeCallback)
  //   }
  //   return debounce(handleQuantityChange, 500)
  // }, [id,updateProduct,showMessageError]);



  const debouncedChangeQuantity = useMemo(
    () =>{
      const handleQuantityChangeCallback = (isSuccess: boolean, mess?: string) => {
        if (!isSuccess) {
          // console.log(mess)
          showMessageError()
        }
      }
    
      const handleQuantityChange = (value:number) => {
        if(order && order.state !== "AddingItems"){
          changeOrderState("AddingItems",(isSuccess:boolean, message?:string) => {
            if(isSuccess){
              showMessageSuccess("Remove from cart successfully!", 4000)
              // mode === "handleBuyNow" ? handleBuyNow() :handleAddToCart()
              updateProduct({orderLineId:id,quantity:value},handleQuantityChangeCallback)
    
            }else{
              showMessageError(message||"Error")
            }
          })
        }else if(id){
          updateProduct({orderLineId:id,quantity:value},handleQuantityChangeCallback)
        }
      }
      return debounce((val:number) => {
        handleQuantityChange(val)
      }, 750)
    },
    [id,showMessageError,updateProduct,changeOrderState,order,showMessageSuccess]
  )

  const debounceFn = React.useCallback(
    (value:number)=> {
      debouncedChangeQuantity(value)
    },
    [debouncedChangeQuantity]
  )

  const handleCancel = () => {
    setVisible(false)
  }
  const handleOpen = () => {
    setVisible(true)
  }
  const handleConfirm = () => {
    if(order && order.state !== "AddingItems"){
      changeOrderState("AddingItems",onChangeOrderStateRemoveCallback)
    }else if(id){
      removeProduct({ orderLineId: id }, handleRemoveCallback)
    }
  }

  const onChangeOrderStateRemoveCallback = (isSuccess:boolean, message?:string) => {
    if(isSuccess){
      removeProduct({ orderLineId: id }, handleRemoveCallback)

    }else{
			showMessageError(message||"Error")
    }
  }
  return (
    <div className={s.productCartItem}>
      <div className={s.info}>
        <Link href={`${ROUTE.PRODUCT_DETAIL}/${slug}`}>
          <a href="">
            <div className={s.imgWrap}>
              <ImgWithLink src={variant?.image?.url ?? ''} alt={name} />
            </div>
          </a>
        </Link>
        <div className={s.detail}>
          <Link href={`${ROUTE.PRODUCT_DETAIL}/${slug}`}>
            <a>
              <div className={s.name}>
                {name} {variant?.weight ? `(${variant.weight})` : ''}
              </div>
            </a>
          </Link>
          <div className={s.price}>
            {discounts.length > 0 && (variant.oldPrice!==variant.price) && (
              <div className={s.old}>
                <div className={s.number}>{variant.oldPrice} {currency?.code}</div>
                {/* <LabelCommon type="discount">{discountSum}</LabelCommon> */}
              </div>
            )}
            <div className={s.current}>
              {variant?.price} {currency?.code}
            </div>
          </div>
        </div>
      </div>
      <div className={s.actions}>
        <div className={s.iconDelete} onClick={handleOpen}>
          <IconDelete />
        </div>
        <QuanittyInput
          size="small"
          initValue={quantityValue}
          onChange={debounceFn}
          min={0}
        />
      </div>
      <ModalConfirm
        visible={visible}
        onClose={handleCancel}
        onCancel={handleCancel}
        onOk={handleConfirm}
        loading={loading}
      >
        Are you sure want to remove {name} form your cart
      </ModalConfirm>
    </div>
  )
}

export default ProductCartItem
