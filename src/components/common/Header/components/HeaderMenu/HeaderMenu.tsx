import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useMemo } from 'react'
import { ButtonCommon } from 'src/components/common'
import InputSearch from 'src/components/common/InputSearch/InputSearch'
import MenuDropdown from 'src/components/common/MenuDropdown/MenuDropdown'
import { useCartDrawer } from 'src/components/contexts'
import {
  IconBuy,
  IconFilter,
  IconHeart,
  IconHistory,
  IconUser,
} from 'src/components/icons'
import {
  ACCOUNT_TAB,
  FILTER_PAGE,
  QUERY_KEY,
  ROUTE,
} from 'src/utils/constanst.utils'
import Logo from '../../../Logo/Logo'
import s from './HeaderMenu.module.scss'
import { useLogout } from '../../../../hooks/auth'
interface Props {
  children?: any
  isFull?: boolean
  isStickyHeader?: boolean
  visibleFilter?: boolean
  openModalAuthen: () => void
  openModalInfo: () => void
  toggleFilter: () => void
}

const HeaderMenu = memo(
  ({
    isFull,
    isStickyHeader,
    visibleFilter,
    openModalAuthen,
    openModalInfo,
    toggleFilter,
  }: Props) => {
    const router = useRouter()
    const { toggleCartDrawer } = useCartDrawer()

    const { logout } = useLogout()

    const optionMenu = useMemo(
      () => [
        {
          onClick: openModalAuthen,
          name: 'Login (Demo)',
        },
        {
          onClick: openModalInfo,
          name: 'Create User Info (Demo)',
        },
        {
          link: '/account-not-login',
          name: 'Account Not Login (Demo)',
        },
        {
          link: '/demo',
          name: 'Notifications Empty (Demo)',
        },
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
      [openModalAuthen, openModalInfo, logout]
    )
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
                  <div
                    className={classNames({
                      [s.dot]: true,
                      [s.isShow]: visibleFilter,
                    })}
                  ></div>
                </button>
              )}
              <button
                className={`${s.iconCart} ${s.btnCart}`}
                onClick={toggleCartDrawer}
              >
                <IconBuy />
              </button>
            </div>
          </div>
          <div className={s.searchWrap}>
            <div className={s.inputSearch}>
              <InputSearch />
            </div>
            <div className={s.buttonSearch}>
              <ButtonCommon>Search</ButtonCommon>
            </div>
          </div>
        </div>
        <ul className={s.menu}>
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
            <MenuDropdown options={optionMenu} isHasArrow={false}>
              <IconUser />
            </MenuDropdown>
          </li>
          <li>
            <button className={s.btnCart} onClick={toggleCartDrawer}>
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
