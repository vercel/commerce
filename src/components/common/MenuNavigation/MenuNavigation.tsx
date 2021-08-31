import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import s from './MenuNavigation.module.scss'

interface Props {
    children?: any,
    heading:string,
    categories:{name:string,link:string}[]
}

const MenuNavigation = ({heading,categories}:Props)=> {
    const router = useRouter()

    return (
        <section className={classNames(s.menuNavigationWrapper)}>
            <h2 className={classNames(s.menuNavigationHeading)}>{heading}({categories.length})</h2>
            <ul className={s.menuNavigationList}>
                {
                    categories.map(item => <li key={item.name}
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
