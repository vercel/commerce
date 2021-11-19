import classNames from 'classnames'
import React, { memo, useEffect, useRef, useState } from 'react'
import { useProductFilter } from 'src/components/contexts'
import { useModalCommon } from 'src/components/hooks'
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
    const { visible: isNotificaitonOpen, toggleModal: toggleNotification } = useModalCommon({ initialValue: false })
    const [searchValue, setSearchValue] = useState<string | number>("")
    
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

    return (
        <>
            <div className={classNames({
                [s.headerSticky]: true,
                [s.show]: !isFullHeader
            })}>
                <HeaderMenu
                    isStickyHeader={true}
                    toggleFilter={toggleFilter}
                    setSearchValue={setSearchValue}
                    searchValue={searchValue}
                    isNotificationOpen={isNotificaitonOpen}
                    toggleNotification={toggleNotification}
                />
            </div>

            <header ref={headeFullRef} className={classNames({ [s.header]: true, [s.full]: isFullHeader })}>
                <HeaderHighLight />
                <div className={s.menu}>
                    <HeaderMenu
                        isFull={isFullHeader}
                        toggleFilter={toggleFilter}
                        setSearchValue={setSearchValue}
                        searchValue={searchValue}
                        isNotificationOpen={isNotificaitonOpen}
                        toggleNotification={toggleNotification}
                    />
                    <HeaderSubMenu />
                </div>
            </header>

            <HeaderSubMenuMobile />
        </>
    )
})

export default Header
