import classNames from 'classnames'
import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import { useModalCommon } from 'src/components/hooks'
import { isMobile } from 'src/utils/funtion.utils'
import ModalAuthenticate from '../ModalAuthenticate/ModalAuthenticate'
import ModalCreateUserInfo from '../ModalCreateUserInfo/ModalCreateUserInfo'
import HeaderHighLight from './components/HeaderHighLight/HeaderHighLight'
import HeaderMenu from './components/HeaderMenu/HeaderMenu'
import HeaderSubMenu from './components/HeaderSubMenu/HeaderSubMenu'
import HeaderSubMenuMobile from './components/HeaderSubMenuMobile/HeaderSubMenuMobile'
import s from './Header.module.scss'


const Header = memo(() => {
    const headeFullRef = useRef<HTMLDivElement>(null)
    const [isFullHeader, setIsFullHeader] = useState<boolean>(true)
    const { visible: visibleModalAuthen, closeModal: closeModalAuthen, openModal: openModalAuthen } = useModalCommon({ initialValue: false })
    const { visible: visibleModalInfo, closeModal: closeModalInfo, openModal: openModalInfo } = useModalCommon({ initialValue: false })

    const headerHeight = useMemo(() => {
        return headeFullRef.current?.offsetHeight
    }, [headeFullRef.current])

    useEffect(() => {
        const handleScroll = () => {
            if (!isMobile()) {
                if (!headerHeight || window.scrollY > headerHeight) {
                    setIsFullHeader(false)
                } else {
                    setIsFullHeader(true)
                }
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [headerHeight])

    return (
        <>
            <header ref={headeFullRef} className={classNames({ [s.header]: true, [s.full]: isFullHeader })}>
                <HeaderHighLight />
                <div className={s.menu}>
                    <HeaderMenu
                        isFull={isFullHeader}
                        openModalAuthen={openModalAuthen}
                        openModalInfo={openModalInfo} />
                    <HeaderSubMenu />
                </div>
            </header>


            <div className={classNames({
                [s.headerSticky]: true,
                [s.show]: !isFullHeader
            })}>
                <HeaderMenu isFull={isFullHeader}
                    openModalAuthen={openModalAuthen}
                    openModalInfo={openModalInfo} />
            </div>

            <HeaderSubMenuMobile />
            <ModalAuthenticate visible={visibleModalAuthen} closeModal={closeModalAuthen} />
            <ModalCreateUserInfo demoVisible={visibleModalInfo} demoCloseModal={closeModalInfo} />
        </>
    )
})

export default Header
