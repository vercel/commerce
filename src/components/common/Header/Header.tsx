import classNames from 'classnames'
import React, { memo, useEffect, useState } from 'react'
import { useModalCommon } from 'src/components/hooks/useModalCommon'
import { isMobile } from 'src/utils/funtion.utils'
import ModalAuthenticate from '../ModalAuthenticate/ModalAuthenticate'
import ModalCreateUserInfo from '../ModalCreateUserInfo/ModalCreateUserInfo'
import HeaderHighLight from './components/HeaderHighLight/HeaderHighLight'
import HeaderMenu from './components/HeaderMenu/HeaderMenu'
import HeaderSubMenu from './components/HeaderSubMenu/HeaderSubMenu'
import HeaderSubMenuMobile from './components/HeaderSubMenuMobile/HeaderSubMenuMobile'
import s from './Header.module.scss'


const Header = memo(() => {
    const [isFullHeader, setIsFullHeader] = useState<boolean>(true)
    const { visible: visibleModalAuthen, closeModal: closeModalAuthen, openModal: openModalAuthen } = useModalCommon({ initialValue: true })
    const { visible: visibleModalInfo, closeModal: closeModalInfo, openModal: openModalInfo } = useModalCommon({ initialValue: false })

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
                    <HeaderMenu isFull={isFullHeader}
                        openModalAuthen={openModalAuthen}
                        openModalInfo={openModalInfo} />
                    <HeaderSubMenu isShow={isFullHeader} />
                </div>
            </header>
            <HeaderSubMenuMobile />
            <ModalAuthenticate visible={visibleModalAuthen} closeModal={closeModalAuthen} />
            <ModalCreateUserInfo demoVisible={visibleModalInfo} demoCloseModal={closeModalInfo}/>
        </>
    )
})

export default Header
