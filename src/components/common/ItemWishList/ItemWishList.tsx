import classNames from 'classnames'
import React, { memo, useState } from 'react'
import { useMessage } from 'src/components/contexts'
import IconHeart from 'src/components/icons/IconHeart'
import { LANGUAGE } from 'src/utils/language.utils'
import { useToggleProductWishlist } from '../../../../src/components/hooks/product'
import s from './ItemWishList.module.scss'
interface Props {
    id:string,
    isActive?: boolean,
    onChange?: () => string
}

const ItemWishList = memo(({id,isActive=false, onChange}:Props) => {
  
    const {onToggleProductWishlist} = useToggleProductWishlist();

    const [idToggleResult,setIdToggleResult] = useState(isActive);
    
    const { showMessageSuccess, showMessageError } = useMessage();

    function toggleWishlist(){
        setIdToggleResult(!idToggleResult);
        onToggleProductWishlist({productId:id},onToggleCallBack)
    }
  
      const onToggleCallBack = (isSuccess: boolean, message?: string) => {
        if (isSuccess) {
          if(!idToggleResult){
            showMessageSuccess("Product added to wishlist", 15000)
          }else{
            showMessageError("Product removed from wishlist", 15000)
          }
        } else {
          showMessageError(LANGUAGE.MESSAGE.ERROR)
          setIdToggleResult(false);
        }
      }

    return(
        <div className={classNames({
            [s.heartToggle]: true, 
            [s.isToggleOn]: idToggleResult
        })}
        onChange={onChange}
        onClick={toggleWishlist}
        >
            <IconHeart />
        </div>
    )
})

export default ItemWishList