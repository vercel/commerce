import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useMemo, useState } from 'react'
import { ButtonCommon } from 'src/components/common'
import InputSearch from 'src/components/common/InputSearch/InputSearch'
import MenuDropdown from 'src/components/common/MenuDropdown/MenuDropdown'
import { useCartDrawer } from 'src/components/contexts'
import { useActiveCustomer } from 'src/components/hooks/auth'
import {
  IconBuy,
  IconFilter,
  IconHeart,
  IconHistory, IconUser
} from 'src/components/icons'
import {
  ACCOUNT_TAB,
  FILTER_PAGE,
  QUERY_KEY,
  ROUTE
} from 'src/utils/constanst.utils'
import { useLogout } from '../../../../hooks/auth'
import Logo from '../../../Logo/Logo'
import s from './HeaderMenu.module.scss'
import NotificationDropdown from './NotificationDropdown/NotificationDropdown'
interface Props {
  children?: any
  isFull?: boolean
  isStickyHeader?: boolean
  openModalLogin: () => void
  openModalRegister: () => void
  toggleFilter: () => void
  searchValue:string|number
  setSearchValue: (value: string | number) => void
}

const HeaderMenu = memo(
  ({
    isFull,
    isStickyHeader,
    openModalLogin,
    openModalRegister,
    toggleFilter,
    searchValue,
    setSearchValue
  }: Props) => {
    const router = useRouter()
    const { toggleCartDrawer } = useCartDrawer()
    const { customer } = useActiveCustomer()
    
    const { logout } = useLogout()

    const optionMenuNotAuthen = useMemo(
      () => [
        {
          onClick: openModalLogin,
          name: 'Sign in',
        },
        {
          onClick: openModalRegister,
          name: 'Create account',
        },
        {
          link: ROUTE.FORGOT_PASSWORD,
          name: 'Forgot Password',
        },
      ],
      [openModalLogin, openModalRegister]
    )

    const optionMenu = useMemo(
      () => [
        {
          link: ROUTE.NOTIFICATION,
          name: 'Notifications',
        },
        {
          link: ROUTE.ACCOUNT,
          name: 'Account',
        },
        {
          link: '/',
          name: 'Logout',
          onClick: logout,
        },
      ],
      [logout]
    )

    const onEnter = () => {
      console.log("enter")
        router.push(`${ROUTE.PRODUCTS}?${QUERY_KEY.SEARCH}=${searchValue}`)
    }

    const onChange = (value:string|number) => {
        setSearchValue(value)
    }
    
    const onCartIconClick = () => {
      toggleCartDrawer()
    }

    return (
      <section
        className={classNames({
          [s.headerMenu]: true,
          [s.small]: isStickyHeader,
          [s.full]: isFull,
        })}
      >
        <div className={s.left}>
          <div className={s.top}>
            <Logo />
            <div className={s.iconGroup}>
              {FILTER_PAGE.includes(router.pathname) && (
                <button className={s.iconFilter} onClick={toggleFilter}>
                  <IconFilter />
                  <div className={s.dot}></div>
                </button>
              )}
              <button
                className={`${s.iconCart} ${s.btnCart}`}
                onClick={onCartIconClick}
              >
                <IconBuy />
              </button>
            </div>
          </div>
          <div className={s.searchWrap}>
            <div className={s.inputSearch}>
              <InputSearch onChange={onChange} onEnter={onEnter} value={searchValue}/>
            </div>
            <div className={s.buttonSearch}>
              <ButtonCommon onClick={onEnter}>Search</ButtonCommon>
            </div>
          </div>
        </div>
        <ul className={s.menu}>
          {
            customer && <>
              <li>
                <Link
                  href={`${ROUTE.ACCOUNT}?${QUERY_KEY.TAB}=${ACCOUNT_TAB.ORDER}`}
                >
                  <a>
                    <IconHistory />
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={`${ROUTE.ACCOUNT}?${QUERY_KEY.TAB}=${ACCOUNT_TAB.FAVOURITE}`}
                >
                  <a className={s.iconFavourite}>
                    <IconHeart />
                  </a>
                </Link>
              </li>
              <li>
                <NotificationDropdown/>
              </li>
            </>
          }
          <li>
            <MenuDropdown options={customer ? optionMenu : optionMenuNotAuthen} isHasArrow={false}>
              <IconUser />
            </MenuDropdown>
          </li>
          <li>
            <button className={s.btnCart} onClick={onCartIconClick}>
              <IconBuy />
            </button>
          </li>
        </ul>
      </section>
    )
  }
)

HeaderMenu.displayName = 'HeaderMenu'
export default HeaderMenu
