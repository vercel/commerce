import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ROUTE } from 'src/utils/constanst.utils'
import s from './MenuNavigation.module.scss'

interface Props {
    children?: any,
    heading: string,
    linkPrefix: string,
    categories: { name: string, slug?: string, code?: string }[]
}

const MenuNavigation = ({ heading, linkPrefix, categories }: Props) => {
    const router = useRouter()

    return (
        <section className={s.menuNavigationWrapper}>
            <h2 className={s.menuNavigationHeading}>{heading}({categories.length})</h2>
            <ul className={s.menuNavigationList}>
                {
                    categories.map(item => <li key={item.name}
                       >
                        <Link href={`${linkPrefix}${item.slug || item.code}`}>
                            <a className={classNames({ [s.active]: router.asPath === `${linkPrefix}${item.slug || item.code}`})}>
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
