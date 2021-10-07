import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo } from 'react'
import MenuDropdown from 'src/components/common/MenuDropdown/MenuDropdown'
import { useGetAllCollection } from 'src/components/hooks/collection'
import { ProductFeature, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils'
import HeaderNoti from './HeaderNoti/HeaderNoti'
import s from './HeaderSubMenu.module.scss'

const MENU = [
    {
        name: 'New Items',
        link: `${ROUTE.PRODUCTS}?${QUERY_KEY.FEATURED}=${ProductFeature.NewItem}`,
    },
    {
        name: 'Sales',
        link: `${ROUTE.PRODUCTS}?${QUERY_KEY.FEATURED}=${ProductFeature.Sales}`,
    },
    {
        name: 'Best Sellers',
        link: `${ROUTE.PRODUCTS}?${QUERY_KEY.FEATURED}=${ProductFeature.BestSellers}`,
    },
    {
        name: 'About Us',
        link: ROUTE.ABOUT,
    },
    {
        name: 'Blog',
        link: ROUTE.BLOGS,
    },
]



const HeaderSubMenu = memo(() => {
    const router = useRouter()
    const {collections} = useGetAllCollection();

    return (
        <section className={s.headerSubMenu}>
            <ul className={s.menu}>
                {/* todo: handle active item */}
                <li>
                    <MenuDropdown options={collections || []} align="left">Categories</MenuDropdown>
                </li>
                {
                    MENU.map(item => <li key={item.name}
                        className={classNames({ [s.active]: router.asPath === item.link })}>
                        <Link href={item.link}>
                            <a >
                                {item.name}
                            </a>
                        </Link>

                    </li>)
                }
            </ul>
            <HeaderNoti />
        </section>
    )
})

export default HeaderSubMenu
