import classNames from 'classnames'
import React, { memo, useEffect, useRef, useState } from 'react'
import { useProductFilter } from 'src/components/contexts'
import { useModalCommon } from 'src/components/hooks'
import ModalAuthenticate from '../ModalAuthenticate/ModalAuthenticate'
import ModalCreateUserInfo from '../ModalCreateUserInfo/ModalCreateUserInfo'
import HeaderHighLight from './components/HeaderHighLight/HeaderHighLight'
import HeaderMenu from './components/HeaderMenu/HeaderMenu'
import HeaderSubMenu from './components/HeaderSubMenu/HeaderSubMenu'
import HeaderSubMenuMobile from './components/HeaderSubMenuMobile/HeaderSubMenuMobile'
import s from './Header.module.scss'
interface props {
    
}

const Header = memo(({ }: props) => {
    const headeFullRef = useRef<HTMLDivElement>(null)
    const { toggleProductFilter: toggleFilter } = useProductFilter()
    const [isFullHeader, setIsFullHeader] = useState<boolean>(true)
    const [isModeAuthenRegister, setIsModeAuthenRegister] = useState<boolean>(false)
    const { visible: visibleModalAuthen, closeModal: closeModalAuthen, openModal: openModalAuthen } = useModalCommon({ initialValue: false })
    const { visible: visibleModalInfo, closeModal: closeModalInfo, openModal: openModalInfo } = useModalCommon({ initialValue: false })

    useEffect(() => {
        const handleScroll = () => {
            if (!headeFullRef.current || window.scrollY > headeFullRef.current?.offsetHeight) {
                setIsFullHeader(false)
            } else {
                setIsFullHeader(true)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const openModalRegister = () => {
        setIsModeAuthenRegister(true)
        openModalAuthen()
    }

    const openModalLogin = () => {
        setIsModeAuthenRegister(false)
        openModalAuthen()
    }

    return (
        <>
            <div className={classNames({
                [s.headerSticky]: true,
                [s.show]: !isFullHeader
            })}>
                <HeaderMenu
                    isStickyHeader={true}
                    toggleFilter={toggleFilter}
                    openModalLogin={openModalLogin}
                    openModalRegister={openModalRegister}
                    openModalInfo={openModalInfo} />
            </div>

            <header ref={headeFullRef} className={classNames({ [s.header]: true, [s.full]: isFullHeader })}>
                <HeaderHighLight />
                <div className={s.menu}>
                    <HeaderMenu
                        isFull={isFullHeader}
                        toggleFilter={toggleFilter}
                        openModalLogin={openModalLogin}
                        openModalRegister = {openModalRegister}
                        openModalInfo={openModalInfo}
                         />
                    <HeaderSubMenu />
                </div>
            </header>

            <HeaderSubMenuMobile />
            <ModalAuthenticate visible={visibleModalAuthen} closeModal={closeModalAuthen} mode={isModeAuthenRegister? 'register': ''} />
            <ModalCreateUserInfo demoVisible={visibleModalInfo} demoCloseModal={closeModalInfo} />
        </>
    )
})

export default Header
