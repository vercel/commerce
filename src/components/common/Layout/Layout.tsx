import { CommerceProvider } from '@framework'
import { useRouter } from 'next/router'
import { FC } from 'react'
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

    return (
        <CommerceProvider locale={locale}>
            <div className={s.mainLayout}>
                <Header />
                <main >{children}</main>
                <Footer />
            </div>
        </CommerceProvider>

    )
}

export default Layout
