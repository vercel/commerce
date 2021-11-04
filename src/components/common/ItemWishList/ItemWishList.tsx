import classNames from 'classnames'
import React, { memo, useState } from 'react'
import { useMessage } from 'src/components/contexts'
import { useActiveCustomer } from 'src/components/hooks/auth'
import IconHeart from 'src/components/icons/IconHeart'
import { LANGUAGE } from 'src/utils/language.utils'
import { useToggleProductWishlist } from '../../../../src/components/hooks/product'
import { useGetFavoriteProduct } from '../../../../src/components/hooks/account'
import s from './ItemWishList.module.scss'

interface Props {
    id?:string,
    onChange?: () => string
}

const ItemWishList = memo(({id, onChange}:Props) => {
   
    const { wishlistId, mutate:mutateIdWishlist } = useActiveCustomer();
    const { mutate:mutateProductWishlist } = useGetFavoriteProduct();
  
    const { onToggleProductWishlist } = useToggleProductWishlist();
    
    const [isWishlist,setIsWishlist] = useState(wishlistId?.includes(id));
  

    const { showMessageSuccess, showMessageError } = useMessage();

    function toggleWishlist(){
        setIsWishlist(!isWishlist);
        onToggleProductWishlist({productId:id},onToggleCallBack)
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
          showMessageError(LANGUAGE.MESSAGE.ERROR)
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