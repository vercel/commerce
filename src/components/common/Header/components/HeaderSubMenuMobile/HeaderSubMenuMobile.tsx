import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo } from 'react'
import { IconHeart, IconHome, IconNoti, IconShopping, IconUser } from 'src/components/icons'
import { ACCOUNT_TAB, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils'
import s from './HeaderSubMenuMobile.module.scss'

const OPTION_MENU = [
    {
        link: ROUTE.HOME,
        name: 'Home',
        icon: <IconHome />,
    },
    {
        link: ROUTE.PRODUCTS,
        name: 'Shopping',
        icon: <IconShopping />,
        isMarked: false,
    },
    {
        link: `${ROUTE.ACCOUNT}?${QUERY_KEY.TAB}=${ACCOUNT_TAB.FAVOURITE}`,
        name: 'Favourites',
        icon: <IconHeart />,
        isMarked: false,
    },
    {
        link: `${ROUTE.ACCOUNT}?${QUERY_KEY.TAB}=${ACCOUNT_TAB.NOTIFICATION}`,
        name: 'Notifications',
        icon: <IconNoti />,
        isMarked: true,
    },
    {
        link: ROUTE.ACCOUNT,
        name: 'Account',
        icon: <IconUser />,
        isMarked: false,
    },
]

interface Props {
    children?: any
}

const HeaderSubMenuMobile = memo(({ }: Props) => {
    const router = useRouter()
    return (
        <header className={s.headerSubMenuMobile}>
            <ul className={s.menu}>
                {
                    OPTION_MENU.map(item => <li key={item.name}>
                        <Link href={item.link}>
                            <a >
                                <div className={classNames({
                                    [s.menuItem]: true,
                                    [s.dot]: item.isMarked,
                                    [s.active]: router.pathname === item.link, // todo: handle active item
                                })}>
                                    <span className={s.icon}>{item.icon}</span>
                                    <span className={s.label}>{item.name}</span>
                                </div>
                            </a>
                        </Link>
                    </li>)
                }
            </ul>
        </header>
    )
})

export default HeaderSubMenuMobile
