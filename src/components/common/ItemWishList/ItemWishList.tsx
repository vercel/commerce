import classNames from 'classnames'
import React, { memo, useEffect, useState } from 'react'
import { useMessage, useToggleWishlist } from 'src/components/contexts'
import { useModalAuthen } from 'src/components/contexts/ModalAuthen/ModalAuthenContext'
import { useActiveCustomer } from 'src/components/hooks/auth'
import IconHeart from 'src/components/icons/IconHeart'
import { useToggleProductWishlist } from '../../../../src/components/hooks/product'
import s from './ItemWishList.module.scss'

interface Props {
  id?: string,
  onChange?: () => string
}

const ItemWishList = memo(({ id, onChange }: Props) => {
  const { customer } = useActiveCustomer();
  const { mutateProductWishlist, wishlistIds } = useToggleWishlist();
  const { onToggleProductWishlist } = useToggleProductWishlist();
  const { openModalAuthen } = useModalAuthen()

  const [isWishlistIcon, setIsWishlistIcon] = useState<boolean>(false);


  useEffect(() => {
    if (id && wishlistIds) {
      const value = wishlistIds?.includes(id)
      setIsWishlistIcon(value)

    }
  }, [wishlistIds, id])

  const { showMessageSuccess, showMessageError, showMessageWarning } = useMessage();

  function toggleWishlist() {
    if (customer) {
      setIsWishlistIcon(!isWishlistIcon);
      onToggleProductWishlist({ productId: id }, onToggleCallBack)
    } else {
      showMessageWarning("Please sign in to add the product to your wishlist", 6000)
      openModalAuthen()
    }
  }

  const onToggleCallBack = (isSuccess: boolean) => {
    if (isSuccess) {
      mutateProductWishlist();
      if (!isWishlistIcon) {
        showMessageSuccess("Product is added to wishlist")
      } else {
        showMessageSuccess("Product is removed from wishlist")
      }
    } else {
      showMessageError()
      setIsWishlistIcon(false);
    }
  }

  return (
    <div className={classNames({
      [s.heartToggle]: true,
      [s.isToggleOn]: isWishlistIcon
    })}
      onChange={onChange}
      onClick={toggleWishlist}
    >
      <IconHeart />
    </div>
  )
})
ItemWishList.displayName = 'ItemWishList';
export default ItemWishList