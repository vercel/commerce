import { useRouter } from 'next/router'
import { MessageProvider } from 'src/components/contexts'
import { ROUTE } from 'src/utils/constanst.utils'
import { Logo } from '..'
import s from './LayoutCheckout.module.scss'

interface Props {
    children?: any,
}

const LayoutCheckout = ({ children }: Props) => {
    const router = useRouter()
    return (
        <>
            <MessageProvider>
                <div className={s.layoutCheckout}>
                    {
                        router.pathname === ROUTE.CHECKOUT_SUCCESS && <div className={s.logoWrap}>
                            <Logo />
                        </div>
                    }
                    <main>{children}</main>
                    <footer className={s.footer}>
                        <div>
                            © 2021 Online Grocery
                        </div>
                    </footer>
                </div>
            </MessageProvider>
        </>
    )
}

export default LayoutCheckout