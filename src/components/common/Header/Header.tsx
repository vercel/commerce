import classNames from 'classnames'
import React, { memo, useEffect, useState } from 'react'
import { isMobile } from 'src/utils/funtion.utils'
import ModalAuthenticate from '../ModalAuthenticate/ModalAuthenticate'
import HeaderHighLight from './components/HeaderHighLight/HeaderHighLight'
import HeaderMenu from './components/HeaderMenu/HeaderMenu'
import HeaderSubMenu from './components/HeaderSubMenu/HeaderSubMenu'
import HeaderSubMenuMobile from './components/HeaderSubMenuMobile/HeaderSubMenuMobile'
import s from './Header.module.scss'

interface Props {
    className?: string
    children?: any
}

const Header = memo(({ }: Props) => {
    const [isFullHeader, setIsFullHeader] = useState<boolean>(true)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleScroll = () => {
        if (!isMobile()) {
            if (window.scrollY === 0) {
                setIsFullHeader(true)
            } else {
                setIsFullHeader(false)
            }
        }
    }
    return (
        <>
            <header className={classNames({ [s.header]: true, [s.full]: isFullHeader })}>
                <HeaderHighLight isShow={isFullHeader} />
                <div className={s.menu}>
                    <HeaderMenu isFull={isFullHeader} />
                    <HeaderSubMenu isShow={isFullHeader} />
                </div>
            </header>
            <HeaderSubMenuMobile />
            <ModalAuthenticate/>
        </>
    )
})

export default Header
