import classNames from 'classnames'
import IconHeart from 'src/components/icons/IconHeart'
import React, { memo } from 'react'
import s from './ItemWishList.module.scss'

interface Props {
    id:string,
    isActive?: boolean,
    onChange?: () => string
}

const ItemWishList = memo(({id,isActive=false, onChange}:Props) => {
    // function toggleFavorite(id:string):string|undefined{
    //     // alert(id);
    //     return id;
    // }
    return(
        <div className={classNames({
            [s.heartToggle]: true, 
            [s.isToggleOn]: isActive
        })}
        // onClick={toggleFavorite(id)}
        onChange={onChange}
        >
            <IconHeart />
        </div>
    )
})

export default ItemWishList