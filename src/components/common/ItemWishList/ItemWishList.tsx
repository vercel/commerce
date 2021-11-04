import classNames from 'classnames'
import React, { memo, useState } from 'react'
import { useMessage } from 'src/components/contexts'
import { useModalAuthen } from 'src/components/contexts/ModalAuthen/ModalAuthenContext'
import { useActiveCustomer } from 'src/components/hooks/auth'
import IconHeart from 'src/components/icons/IconHeart'
import { useGetFavoriteProduct } from '../../../../src/components/hooks/account'
import { useToggleProductWishlist } from '../../../../src/components/hooks/product'
import s from './ItemWishList.module.scss'

interface Props {
    id?:string,
    onChange?: () => string
}

const ItemWishList = memo(({id, onChange}:Props) => {
    const { wishlistId, mutate:mutateIdWishlist, customer } = useActiveCustomer();
    const { mutate:mutateProductWishlist } = useGetFavoriteProduct();
    const { onToggleProductWishlist } = useToggleProductWishlist();
    const { openModalAuthen } = useModalAuthen()
    
    const [isWishlist,setIsWishlist] = useState(wishlistId?.includes(id));
  

    const { showMessageSuccess, showMessageError, showMessageWarning } = useMessage();

    function toggleWishlist(){
      if (customer) {
        setIsWishlist(!isWishlist);
        onToggleProductWishlist({productId:id},onToggleCallBack)
      } else {
        showMessageWarning("Please login to add the product to your wishlist", 6000)
        openModalAuthen()
      }
    }
  
      const onToggleCallBack = (isSuccess: boolean, message?: string) => {
        if (isSuccess) {
          mutateIdWishlist();
          mutateProductWishlist();
          if(!isWishlist){
            showMessageSuccess("Product added to wishlist", 15000)
          }else{
            showMessageError("Product removed from wishlist", 15000)
          }
        } else {
          showMessageError(message)
          setIsWishlist(false);
        }
      }

    return(
        <div className={classNames({
            [s.heartToggle]: true, 
            [s.isToggleOn]: isWishlist
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