import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useCallback, useEffect, useMemo } from 'react'
import { ButtonCommon } from 'src/components/common'
import InputSearch from 'src/components/common/InputSearch/InputSearch'
import MenuDropdown from 'src/components/common/MenuDropdown/MenuDropdown'
import { useCartDrawer, useMessage } from 'src/components/contexts'
import { useModalAuthen } from 'src/components/contexts/ModalAuthen/ModalAuthenContext'
import { useActiveCustomer } from 'src/components/hooks/auth'
import {
  IconBuy,
  IconFilter,
  IconHeart,
  IconHeartHead,
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
  toggleFilter: () => void
  searchValue: string | number
  setSearchValue: (value: string | number) => void
  isNotificationOpen: boolean
  toggleNotification: () => void
}

const HeaderMenu = memo(
  ({
    isFull,
    isStickyHeader,
    toggleFilter,
    searchValue,
    setSearchValue,
    isNotificationOpen,
    toggleNotification,
  }: Props) => {
    const router = useRouter()
    const { toggleCartDrawer } = useCartDrawer()
    const { customer } = useActiveCustomer()
    const { openModalAuthen } = useModalAuthen()
    const { logout } = useLogout()
    const { showMessageWarning } = useMessage()

    const openModalRegister = useCallback(() => {
      return openModalAuthen(undefined, 'register')
    }, [openModalAuthen])

    const showMessageSignInRequireForOrder = () => {
      showMessageWarning("Please sign in to see information about your orders")
      openModalAuthen()
    }

    const showMessageSignInRequireForWishlist = () => {
      showMessageWarning("Please sign in to see your wishlist")
      openModalAuthen()
    }

    const optionMenuNotAuthen = useMemo(
      () => [
        {
          onClick: openModalAuthen,
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
      [openModalRegister, openModalAuthen]
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

    useEffect(() => {
      if(!router.query.search){
        setSearchValue("")
      }
    }, [router.query,setSearchValue])

    const onEnter = () => {
      router.push(`${ROUTE.PRODUCTS}?${QUERY_KEY.SEARCH}=${searchValue}`)
    }

    const onChange = (value: string | number) => {
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
              <InputSearch onChange={onChange} onEnter={onEnter} value={searchValue} />
            </div>
            <div className={s.buttonSearch}>
              <ButtonCommon onClick={onEnter}>Search</ButtonCommon>
            </div>
          </div>
        </div>
        <ul className={s.menu}>
          {
            customer ? <>
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
                    <IconHeartHead />
                  </a>
                </Link>
              </li>
              <li>
                <NotificationDropdown isOpen={isNotificationOpen} toggle={toggleNotification} />
              </li>
            </> : <>
              <li>
                <button onClick={showMessageSignInRequireForOrder}><IconHistory /></button>
              </li>
              <li>
                <button onClick={showMessageSignInRequireForWishlist} className={s.iconFavourite}><IconHeartHead /></button>
              </li>
              <li>
                <NotificationDropdown isShowLogin={true} isOpen={isNotificationOpen} toggle={toggleNotification} />
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
