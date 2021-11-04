import { CommerceProvider } from '@framework'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { CartDrawerProvider, MessageProvider, ProductFilterProvider,ToggleProductWishlistProvider } from 'src/components/contexts'
import LayoutContent from './LayoutContent/LayoutContent'
interface Props {
  className?: string
  children?: any
}

const Layout: FC<Props> = ({ children }) => {
  const { locale = 'en-US' } = useRouter()
  return (
    <CommerceProvider locale={locale}>
      <ToggleProductWishlistProvider>
      <CartDrawerProvider>
        <ProductFilterProvider>
          <MessageProvider>
            <LayoutContent>{children}</LayoutContent>
          </MessageProvider>
        </ProductFilterProvider>
      </CartDrawerProvider>
      </ToggleProductWishlistProvider>
    </CommerceProvider>
  )
}

export default Layout
