import Link from 'next/link'
import { memo } from 'react'
import { ROUTE } from 'src/utils/constanst.utils'
import s from './HeaderHighLight.module.scss'

const MENU = [
    {
        name: 'Delivery & Policy',
        link: ROUTE.PRIVACY_POLICY,
    },
    {
        name: 'Blog',
        link: ROUTE.BLOGS,
    },
    {
        name: 'About Us',
        link: ROUTE.ABOUT,
    },
]

const HeaderHighLight = memo(() => {
    return (
        <section className={s.headerHighLight}>
            <div>
                Free Shipping on order $49+ / Express $99+
            </div>
            <ul className={s.menu}>
                {
                    MENU.map(item => <li key={item.name}>
                        <Link href={item.link}>
                            <a >
                                {item.name}
                            </a>
                        </Link>

                    </li>)
                }
            </ul>
        </section>
    )
})
HeaderHighLight.displayName = 'HeaderHighLight'
export default HeaderHighLight
