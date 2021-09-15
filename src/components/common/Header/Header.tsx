import classNames from 'classnames'
import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import { useModalCommon } from 'src/components/hooks'
import { CartDrawer } from '..'
import ModalAuthenticate from '../ModalAuthenticate/ModalAuthenticate'
import ModalCreateUserInfo from '../ModalCreateUserInfo/ModalCreateUserInfo'
import HeaderHighLight from './components/HeaderHighLight/HeaderHighLight'
import HeaderMenu from './components/HeaderMenu/HeaderMenu'
import HeaderSubMenu from './components/HeaderSubMenu/HeaderSubMenu'
import HeaderSubMenuMobile from './components/HeaderSubMenuMobile/HeaderSubMenuMobile'
import s from './Header.module.scss'
interface props {
    toggleFilter: () => void,
    visibleFilter: boolean
}

const Header = memo(({ toggleFilter, visibleFilter }: props) => {
    const headeFullRef = useRef<HTMLDivElement>(null)
    const [isFullHeader, setIsFullHeader] = useState<boolean>(true)
    const { visible: visibleModalAuthen, closeModal: closeModalAuthen, openModal: openModalAuthen } = useModalCommon({ initialValue: false })
    const { visible: visibleModalInfo, closeModal: closeModalInfo, openModal: openModalInfo } = useModalCommon({ initialValue: false })
    const { visible: visibleCartDrawer, openModal: openCartDrawer, closeModal: closeCartDrawer } = useModalCommon({ initialValue: false })

    const toggleCart = () => {
        if (visibleCartDrawer) {
            closeCartDrawer()
        } else {
            openCartDrawer()
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            if (!headeFullRef.current || window.scrollY > headeFullRef.current?.offsetHeight) {
                setIsFullHeader(false)
            } else {
                setIsFullHeader(true)
            }
            // if (!isMobile()) {
            // } else {
            //     setIsFullHeader(true)
            // }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [headeFullRef.current])

    return (
        <>
            <div className={classNames({
                [s.headerSticky]: true,
                [s.show]: !isFullHeader
            })}>
                <HeaderMenu
                    isStickyHeader={true}
                    toggleFilter={toggleFilter}
                    toggleCart={toggleCart}
                    openModalAuthen={openModalAuthen}
                    openModalInfo={openModalInfo} />
            </div>

            <header ref={headeFullRef} className={classNames({ [s.header]: true, [s.full]: isFullHeader })}>
                <HeaderHighLight />
                <div className={s.menu}>
                    <HeaderMenu
                        isFull={isFullHeader}
                        visibleFilter={visibleFilter}
                        toggleFilter={toggleFilter}
                        toggleCart={toggleCart}
                        openModalAuthen={openModalAuthen}
                        openModalInfo={openModalInfo} />
                    <HeaderSubMenu />
                </div>
            </header>

            <HeaderSubMenuMobile />
            <ModalAuthenticate visible={visibleModalAuthen} closeModal={closeModalAuthen} />
            <ModalCreateUserInfo demoVisible={visibleModalInfo} demoCloseModal={closeModalInfo} />
            <CartDrawer
                visible={visibleCartDrawer}
                onClose={closeCartDrawer} />
        </>
    )
})

export default Header
