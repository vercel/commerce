import s from './LayoutCheckout.module.scss'

interface Props {
    children?: any,
}

const LayoutCheckout = ({ children }: Props) => {
    return (
        <div className={s.layoutCheckout}>
            <main>{children}</main>
            <footer className={s.footer}>
                <div>
                    © 2021 Online Grocery
                </div>
            </footer>
        </div>
    )
}

export default LayoutCheckout