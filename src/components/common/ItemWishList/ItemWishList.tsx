import classNames from 'classnames'
import React, { memo, useState } from 'react'
import { useMessage, useToggleWishlist } from 'src/components/contexts'
import IconHeart from 'src/components/icons/IconHeart'
import { LANGUAGE } from 'src/utils/language.utils'
import { useToggleProductWishlist } from '../../../../src/components/hooks/product'
import s from './ItemWishList.module.scss'

interface Props {
    id?:string,
    onChange?: () => string
}

const ItemWishList = memo(({  id, onChange}:Props) => {

    const { mutateProductWishlist,itemWishlist } = useToggleWishlist();
    
    const { onToggleProductWishlist } = useToggleProductWishlist();
    
    const [isWishlistIcon, setIsWishlistIcon ] = useState(()=>itemWishlist?.map(val=>val.id).includes(id));
   

    const { showMessageSuccess, showMessageError } = useMessage();

    function toggleWishlist(){
        setIsWishlistIcon(!isWishlistIcon);
        onToggleProductWishlist({productId:id},onToggleCallBack)
    }
  
    const onToggleCallBack = (isSuccess: boolean, message?: string) => {
      if (isSuccess) {
        mutateProductWishlist();
        if(!isWishlistIcon){
          showMessageSuccess("Product added to wishlist", 15000)
        }else{
          showMessageError("Product removed from wishlist", 15000)
        }
      } else {
        showMessageError(LANGUAGE.MESSAGE.ERROR)
        setIsWishlistIcon(false);
      }
    }

    return(
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