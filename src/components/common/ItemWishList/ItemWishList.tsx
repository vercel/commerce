import classNames from 'classnames'
import { Heart } from '@components/icons'
import React, { memo } from 'react'
import s from './ItemWishList.module.scss'

interface Props {
    isActive?: boolean,
    onClick?: () => void
}

const ItemWishList = memo(({isActive, onClick}:Props) => {
    const handleClick = () => {
        isActive = !isActive
    }
    return(
        <div className={classNames({
            [s.heartToggle]:true, 
            [s.isToggleOn]:isActive
        })}
        onClick={handleClick}>
            <Heart />
        </div>
    )
})

export default ItemWishList