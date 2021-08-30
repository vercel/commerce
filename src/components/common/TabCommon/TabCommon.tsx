import React, { useState } from "react"
import s from './TabCommon.module.scss'

import TabItem from './TabItem/TabItem'

interface TabCommonProps {

}

const TabCommon = ({ } : TabCommonProps) => {
    const [item1Active, setItem1Active] = useState(true);
    const [item2Active, setItem2Active] = useState(false);
    const [item3Active, setItem3Active] = useState(false);

    const toggleItem1 = () => {
        setItem1Active(true)

        setItem2Active(false)
        setItem3Active(false)
    }
    const toggleItem2 = () => {
        setItem2Active(true)

        setItem1Active(false)
        setItem3Active(false)
    }
    const toggleItem3 = () => {
        setItem3Active(true)

        setItem1Active(false)
        setItem2Active(false)
    }

    return (
        <div className={s.tabCommon}>
            <span onClick={toggleItem1}><TabItem active={item1Active}>Wait for Comfirmation</TabItem></span>
            <span onClick={toggleItem2}><TabItem active={item2Active}>Delivering</TabItem></span>
            <span onClick={toggleItem3}><TabItem active={item3Active}>Delivered</TabItem></span>
        </div>
    )
}

export default TabCommon;