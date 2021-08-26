import s from './Logo.module.scss'

const Logo = () => {
    return(
        <div className={s.logo}>
            <div className={s.eclipse}>
            </div>
            <div className={s.content}>
                ONLINE GROCERY
            </div>
        </div>
    )
}

export default Logo