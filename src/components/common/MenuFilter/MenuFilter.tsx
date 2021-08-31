import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './MenuFilter.module.scss'


interface Props {
    children?: any,
    heading:string,
    categories:{name:string,link:string}[]
}

const MenuFilter = ({heading,categories}:Props)=> {
    const router = useRouter()

    return (
        <section className={classNames(s.menuFilterWrapper)}>
            <h2 className={classNames(s.menuFilterHeading)}>{heading}</h2>
            <ul className={s.menuFilterList}>
                {
                    categories.map(item => <li key={item.name}>
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

export default MenuFilter
