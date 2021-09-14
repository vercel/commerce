import React from "react";
import classNames from "classnames";
import s from './AccountNavigationItem.module.scss'

interface AccountNavigationItemProps {
    children?: string;
    active?: boolean;
    tabIndex: number
    onClick: (index: number) => void;
}

const AccountNavigationItem = ({ children, active, tabIndex, onClick } : AccountNavigationItemProps) => {
    
    const handleClick = () => {
        onClick(tabIndex)
    }
    return (
        <div onClick={handleClick} className={classNames(s.accountNavigationItem, {
            [s.active]:active
        })}>
            {children}
        </div>
    )
}

export default AccountNavigationItem