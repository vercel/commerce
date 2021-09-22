import { CommerceProvider } from '@framework'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { CartDrawerProvider } from 'src/components/contexts/CartDrawer/CartDrawerProvider'
import LayoutContent from './LayoutContent/LayoutContent'
interface Props {
    className?: string
    children?: any
}

// note: demo code
const Layout: FC<Props> = ({ children }) => {
    const { locale = 'en-US' } = useRouter()
    return (
        <CommerceProvider locale={locale}>
            <CartDrawerProvider>
                <LayoutContent>
                    {children}
                </LayoutContent>
            </CartDrawerProvider>
        </CommerceProvider>

    )
}

export default Layout
