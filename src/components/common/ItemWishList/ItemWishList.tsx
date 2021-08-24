import { Heart } from '@components/icons'
import React, { useState } from 'react'
import s from './ItemWishList.module.scss'

interface Props {
    className?: string
    children?: any
}

const ItemWishList = ({}:Props) => {
    const [isClick,setClick] = useState(false)
    return(
        <div className={s.heartToggle} onClick={() => setClick(!isClick)}>
            <Heart color={isClick ? "#D1644D" : "#5B9A74"}/>
        </div>
    )
}

export default ItemWishList