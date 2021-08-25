import React, { memo } from 'react'
import HeaderHighLight from './components/HeaderHighLight/HeaderHighLight'
import HeaderMenu from './components/HeaderMenu/HeaderMenu'
import HeaderSubMenu from './components/HeaderSubMenu/HeaderSubMenu'
import s from './Header.module.scss'

interface Props {
    className?: string
    children?: any
}

const Header = memo(({ }: Props) => {
    return (
        <header className={s.header}>
            <HeaderHighLight />
            <div className={s.menu}>
                <HeaderMenu />
                <HeaderSubMenu />
            </div>
        </header>
    )
})

export default Header
