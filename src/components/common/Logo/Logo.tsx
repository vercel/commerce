import s from './Logo.module.scss'
import Link from 'next/link'
import { ROUTE } from 'src/utils/constanst.utils'

const Logo = () => {
    return (
        <Link href={ROUTE.HOME}>
            <a className={s.logo}>
                <div className={s.eclipse}>
                </div>
                <div className={s.content}>
                    ONLINE GROCERY
                </div>
            </a>
        </Link>
    )
}

export default Logo