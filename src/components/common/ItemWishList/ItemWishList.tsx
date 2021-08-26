import classNames from 'classnames'
import IconHeart from 'src/components/icons/IconHeart'
import React, { memo } from 'react'
import s from './ItemWishList.module.scss'

interface Props {
    isActive?: boolean,
    onChange?: () => void
}

const ItemWishList = memo(({isActive=false, onChange}:Props) => {
    return(
        <div className={classNames({
            [s.heartToggle]: true, 
            [s.isToggleOn]: isActive
        })}
        onChange={onChange}
        >
            <IconHeart />
        </div>
    )
})

export default ItemWishList