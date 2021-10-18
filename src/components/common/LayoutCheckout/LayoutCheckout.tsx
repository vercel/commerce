import { MessageProvider } from 'src/components/contexts'
import s from './LayoutCheckout.module.scss'

interface Props {
    children?: any,
}

const LayoutCheckout = ({ children }: Props) => {
    return (
        <>
            <MessageProvider>
                <div className={s.layoutCheckout}>
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