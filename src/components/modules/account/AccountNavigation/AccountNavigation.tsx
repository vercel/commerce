import React, { useState } from "react"
import s from './AccountNavigation.module.scss'

import AccountNavigationItem from './components/AccountNavigationItem' 

interface AccountNavigationProps {
    
}

const AccountNavigation = ({  } : AccountNavigationProps) => {
    const active = "active", unActive = "";

    const [item1Active, setItem1Active] = useState(active);
    const [item2Active, setItem2Active] = useState(unActive);
    const [item3Active, setItem3Active] = useState(unActive);

    function toggleItem1():void {
        setItem1Active(active)

        setItem2Active(unActive)
        setItem3Active(unActive)
    }
    function toggleItem2():void {
        setItem2Active(active)

        setItem1Active(unActive)
        setItem3Active(unActive)
    }
    function toggleItem3():void {
        setItem3Active(active)

        setItem1Active(unActive)
        setItem2Active(unActive)
    }
    return (
        <section className={s.accountNavigation}>
            <div onClick={toggleItem1}>
                <AccountNavigationItem active={item1Active}>Customer Information</AccountNavigationItem>
                </div>
            <div onClick={toggleItem2}>
                <AccountNavigationItem active={item2Active}>Your Orders</AccountNavigationItem>
            </div>
            <div onClick={toggleItem3}>
                <AccountNavigationItem active={item3Active}>Favourites</AccountNavigationItem>
            </div>
        </section>
    )
}

export default AccountNavigation