import { FC, useRef, useEffect } from 'react'
import Header from '../Header/Header'
import { CommerceProvider } from '@framework'
import { useRouter } from 'next/router'

interface Props {
    className?: string
    children?: any
}

// note: demo code
const Layout: FC<Props> = ({ children }) => {
    const { locale = 'en-US' } = useRouter()

    return (
        <CommerceProvider locale={locale}>
            <Header />
            <main>{children}</main>
        </CommerceProvider>

    )
}

export default Layout
