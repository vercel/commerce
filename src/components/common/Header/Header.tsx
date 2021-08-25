import { FC, memo } from 'react'
import { IconUser } from 'src/components/icons'
import MenuDropdown from '../MenuDropdown/MenuDropdown'
import HeaderHighLight from './components/HeaderHighLight/HeaderHighLight'
import HeaderMenu from './components/HeaderMenu/HeaderMenu'
import HeaderSubMenu from './components/HeaderSubMenu/HeaderSubMenu'
import s from './Header.module.scss'

const OPTION_MENU = [
    {
        link: '/',
        name: 'Account',
    },
    {
        link: '/',
        name: 'Logout',
    },

]

// {/* <MenuDropdown options={OPTION_MENU} isHasArrow={false}><IconUser /></MenuDropdown> */}

interface Props {
    className?: string
    children?: any
}

const Header = memo(({ }: Props) => {
    return (
        <header className={s.header}>
            <HeaderHighLight />
            <HeaderMenu />
            <HeaderSubMenu />
        </header>
    )
})

export default Header
