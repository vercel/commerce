import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { OPTION_ALL, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils'
import s from './MenuNavigation.module.scss'
const CATEGORY = [
    {
        name: 'All',
        link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=${OPTION_ALL}`,
    },
    {
        name: 'Veggie',
        link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=veggie`,
    },
    {
        name: 'Seafood',
        link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=seafood`,
    },
    {
        name: 'Frozen',
        link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=frozen`,
    },
    {
        name: 'Coffee Bean',
        link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=coffee-bean`,
    },
    {
        name: 'Sauce',
        link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=sauce`,
    },
]

interface Props {
    children?: any,
    heading:string,
}

const MenuNavigation = ({heading}:Props)=> {
    const router = useRouter()

    return (
        <section className={classNames(s.menuNavigationWrapper)}>
            <h2 className={classNames(s.menuNavigationHeading)}>{heading}({CATEGORY.length})</h2>
            <ul className={s.menuNavigationList}>
                {
                    CATEGORY.map(item => <li key={item.name}
                       >
                        <Link href={item.link}>
                            <a className={classNames({ [s.active]: router.asPath === item.link})}>
                                {item.name}
                            </a>
                        </Link>
                    </li>)
                }
            </ul>
        </section>
    )
}

export default MenuNavigation
