import s from './Logo.module.scss'

interface Props {
    className?: string
    children?: any
}

const Logo = ({}: Props) => {
    return(
        <div className={s.logo}>
            <div className={s.eclipse}>

            </div>
            <div className={s.conTent}>
                ONLINE GROCERY
            </div>
        </div>
    )
}

export default Logo