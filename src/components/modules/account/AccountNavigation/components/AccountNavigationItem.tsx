import React, { RefObject } from "react";
import classNames from "classnames";
import s from './AccountNavigationItem.module.scss'

interface AccountNavigationItemProps {
    children?: string;
    active?: string;
    target?: string;
    onClick: () => void;
}

const AccountNavigationItem = ({ children, active="", onClick } : AccountNavigationItemProps) => {
    return (
        <div onClick={onClick} className={classNames(s.accountNavigationItem, {
            [s[active]]:active
        })}>
            {children}
        </div>
    )
}

export default AccountNavigationItem