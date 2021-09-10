import classNames from 'classnames'
import Link from 'next/link'
import { memo, useMemo } from 'react'
import InputSearch from 'src/components/common/InputSearch/InputSearch'
import MenuDropdown from 'src/components/common/MenuDropdown/MenuDropdown'
import { IconBuy, IconFilter, IconHeart, IconHistory, IconUser } from 'src/components/icons'
import { ACCOUNT_TAB, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils'
import Logo from '../../../Logo/Logo'
import s from './HeaderMenu.module.scss'
import { useRouter } from 'next/router'
interface Props {
    children?: any,
    isFull: boolean,
    openModalAuthen: () => void,
    openModalInfo: () => void,
    toggleFilter:() => void,
    toggleCart:() => void,
}

const FILTER_PAGE = [ROUTE.HOME,ROUTE.PRODUCTS]

const HeaderMenu = memo(({ isFull, openModalAuthen, openModalInfo, toggleFilter, toggleCart }: Props) => {
    const router = useRouter()
    const optionMenu = useMemo(() => [
        {
            onClick: openModalAuthen,
            name: 'Login (Demo)',
        },
        {
            onClick: openModalInfo,
            name: 'Create User Info (Demo)',
        },
        {
            link: ROUTE.ACCOUNT,
            name: 'Account',
        },
        {
            link: '/',
            name: 'Logout',
        },

    ], [openModalAuthen])
    return (
        <section className={classNames({ [s.headerMenu]: true, [s.full]: isFull })}>
            <div className={s.left}>
                <div className={s.top}>
                    <Logo/>
                    <div className={s.iconGroup}>
                        {
                            FILTER_PAGE.includes(router.pathname) && (
                                <button className={s.iconFilter} onClick={toggleFilter}>
                                    <IconFilter/>
                                </button>
                            )
                        }
                        <button className={s.iconCart}>
                            <IconBuy />
                        </button>
                    </div>

                </div>
                <div className={s.inputSearch}>
                    <InputSearch />
                </div>
            </div>
            <ul className={s.menu}>
                <li>
                    <Link href={`${ROUTE.ACCOUNT}?${QUERY_KEY.TAB}=${ACCOUNT_TAB.ORDER}`}>
                        <a>
                            <IconHistory />
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`${ROUTE.ACCOUNT}?${QUERY_KEY.TAB}=${ACCOUNT_TAB.FAVOURITE}`}>
                        <a className={s.iconFavourite}>
                            <IconHeart />
                        </a>
                    </Link>
                </li>
                <li>
                    <MenuDropdown options={optionMenu} isHasArrow={false}><IconUser /></MenuDropdown>
                </li>
                <li>
                    <button className={s.btnCart} onClick={toggleCart}>
                        <IconBuy />
                    </button>
                </li>
                
                {
                            FILTER_PAGE.includes(router.pathname) && (
                                <li className={s.iconFilterDesk}>
                                    <button className={s.iconFilter} onClick={toggleFilter}>
                                        <IconFilter/>
                                    </button>
                                </li>
                            )
                        }
            </ul>
        </section>
    )
})

export default HeaderMenu
