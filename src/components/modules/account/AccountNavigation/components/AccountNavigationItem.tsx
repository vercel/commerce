import React from "react";
import classNames from "classnames";
import s from './AccountNavigationItem.module.scss'

interface AccountNavigationItemProps {
    children?: string;
    active?: string;
    target?: string;
}

const AccountNavigationItem = ({ children, active="" } : AccountNavigationItemProps) => {
    return (
        <div className={classNames(s.accountNavigationItem, {
            [s[active]]:active
        })}>
            {children}
        </div>
    )
}

export default AccountNavigationItem