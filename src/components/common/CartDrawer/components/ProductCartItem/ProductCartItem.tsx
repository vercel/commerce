import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import { ModalConfirm, QuanittyInput } from 'src/components/common'
import { IconDelete } from 'src/components/icons'
import { ROUTE } from 'src/utils/constanst.utils'
import ImgWithLink from '../../../ImgWithLink/ImgWithLink'
import LabelCommon from '../../../LabelCommon/LabelCommon'
import s from './ProductCartItem.module.scss'
import { LineItem } from '@commerce/types/cart'
import { useUpdateProductInCart } from 'src/components/hooks/cart'
import { debounce } from 'lodash'
import useRemoveProductInCart from 'src/components/hooks/cart/useRemoveProductInCart'
import { useMessage } from 'src/components/contexts'
import { useGetUserOrder } from 'src/components/hooks/account'
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
  id
}: ProductCartItempProps) => {
  const [visible, setVisible] = useState(false)
  const {updateProduct} = useUpdateProductInCart()
  const {removeProduct, loading} = useRemoveProductInCart()
	const {showMessageSuccess, showMessageError } = useMessage()
  const { mutate: mutateUserOrder } = useGetUserOrder();
  // const handleQuantityChangeCallback = (isSuccess:boolean,mess?:string) => {
  //   if(!isSuccess){
  //     // console.log(mess)
  //     showMessageError()
  //   }
  // }
  const handleRemoveCallback = (isSuccess:boolean,mess?:string) => {
    if(!isSuccess){
      showMessageError()
    }else{
      showMessageSuccess("Remove success")
      setVisible(false)
      mutateUserOrder()
    }
  }
  const debounceFn = useCallback(()=>{
    const handleQuantityChangeCallback = (isSuccess:boolean,mess?:string) => {
      if(!isSuccess){
        // console.log(mess)
        showMessageError()
      }
    }
    const handleQuantityChange = (value:number) => {
      updateProduct({orderLineId:id,quantity:value},handleQuantityChangeCallback)
    }
    return debounce(handleQuantityChange, 500)
  }, [id,updateProduct,showMessageError]);
  const handleCancel = () => {
    setVisible(false)
  }
  const handleOpen = () => {
    setVisible(true)
  }
  const handleConfirm = () => {
    removeProduct({orderLineId:id},handleRemoveCallback)
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
            {discounts.length > 0 && (
                <div className={s.old}>
                  {/* <span className={s.number}>{oldPrice}</span> */}
                  {/* TODO: edit the value */}
                  <LabelCommon type="discount">{discounts[0]?.value}</LabelCommon>
                </div>
            )}
            <div className={s.current}>{variant?.price} {currency?.code}</div>
          </div>
        </div>
      </div>
      <div className={s.actions}>
        <div className={s.iconDelete} onClick={handleOpen}>
          <IconDelete />
        </div>
        <QuanittyInput size="small" initValue={quantity} onChange={debounceFn}/>
      </div>
      <ModalConfirm visible={visible} onClose={handleCancel} onCancel={handleCancel} onOk={handleConfirm} loading={loading}>
        Are you sure want to remove {name} form your cart
      </ModalConfirm>
    </div>
  )
}

export default ProductCartItem
