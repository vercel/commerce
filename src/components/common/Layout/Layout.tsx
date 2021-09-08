import { CommerceProvider } from '@framework'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useModalCommon } from 'src/components/hooks'
import { CartDrawer } from '..'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import s from './Layout.module.scss'

interface Props {
    className?: string
    children?: any
}

// note: demo code
const Layout: FC<Props> = ({ children }) => {
    const { locale = 'en-US' } = useRouter()
    const { visible: visibleCartDrawer, openModal, closeModal: closeCartDrawer } = useModalCommon({ initialValue: false })

    const toggle = () => {
        if (visibleCartDrawer) {
            closeCartDrawer()
        } else {
            openModal()
        }
    }
    return (
        <CommerceProvider locale={locale}>
            <div className={s.mainLayout}>
                {/* <Header /> */}
                <main >{children}</main>
                <button onClick={toggle}>toggle card: {visibleCartDrawer.toString()}</button>
                <CartDrawer
                    visible={visibleCartDrawer}
                    onClose={closeCartDrawer} />
                <Footer />
            </div>
        </CommerceProvider>

    )
}

export default Layout
