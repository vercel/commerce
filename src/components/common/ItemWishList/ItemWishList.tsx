import classNames from 'classnames'
import IconHeart from 'src/components/icons/IconHeart'
import React, { memo } from 'react'
import s from './ItemWishList.module.scss'
import { useToggleProductWishlist } from '../../../../src/components/hooks/product'
import { useMessage } from 'src/components/contexts'
import { LANGUAGE } from 'src/utils/language.utils'
interface Props {
    id:string,
    isActive?: boolean,
    onChange?: () => string
}

const ItemWishList = memo(({id,isActive=false, onChange}:Props) => {
    const {onToggleProductWishlist} = useToggleProductWishlist();
    const { showMessageSuccess, showMessageError } = useMessage();

    function toggleWishlist(){
        onToggleProductWishlist({productId:id},onSignupCallBack)
    }
  
      const onSignupCallBack = (isSuccess: boolean, message?: string) => {
        if (isSuccess) {
        //   showMessageSuccess("Create account successfully. Please verify your email to login.", 15000)
        } else {
          showMessageError(message || LANGUAGE.MESSAGE.ERROR)
        }
      }
    
    return(
        <div className={classNames({
            [s.heartToggle]: true, 
            [s.isToggleOn]: isActive
        })}
        onChange={onChange}
        onClick={toggleWishlist}
        >
            <IconHeart />
        </div>
    )
})

export default ItemWishList