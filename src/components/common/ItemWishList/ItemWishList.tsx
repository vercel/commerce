import classNames from 'classnames'
import IconHeart from 'src/components/icons/IconHeart'
import React, { memo } from 'react'
import s from './ItemWishList.module.scss'

interface Props {
    isActive?: boolean,
    onClick?: () => void
    onChange?: () => void
}

const ItemWishList = memo(({isActive, onClick, onChange}:Props) => {
    const handleClick = () => {
        isActive = !isActive
    }
    return(
        <div className={classNames({
            [s.heartToggle]:true, 
            [s.isToggleOn]:isActive
        })}
        onClick={handleClick}>
            <IconHeart />
        </div>
    )
})

export default ItemWishList