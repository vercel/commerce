import { FC } from 'react'
import cn from 'classnames'
import type { Page } from '@lib/bigcommerce/api/operations/get-all-pages'
import { CommerceProvider } from '@lib/bigcommerce'
import { Navbar, Featurebar, Footer } from '@components/core'
import { Container, Sidebar } from '@components/ui'
import { CartSidebarView } from '@components/cart'
import { useUI } from '@components/ui/context'
import s from './Layout.module.css'

interface Props {
  pageProps: {
    pages?: Page[]
  }
}

const Layout: FC<Props> = ({ children, pageProps }) => {
  const { displaySidebar, closeSidebar } = useUI()

  return (
    <CommerceProvider locale="en-us">
      <div className={cn(s.root)}>
        <Featurebar
          title="Free Standard Shipping on orders over $99.99"
          description="Due to COVID-19, some orders may experience processing and delivery delays."
        />
        <Container>
          <Navbar />
        </Container>
        <main className="fit">{children}</main>
        <Footer pages={pageProps.pages} />
        <Sidebar show={displaySidebar} close={closeSidebar}>
          <CartSidebarView />
        </Sidebar>
      </div>
    </CommerceProvider>
  )
}

export default Layout
