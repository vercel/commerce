import { FC } from 'react'
import type { Page } from '@lib/bigcommerce/api/operations/get-all-pages'
import { CommerceProvider } from '@lib/bigcommerce'
import { Navbar, Featurebar, Footer } from '@components/core'
import { Container, Sidebar } from '@components/ui'
import { CartSidebarView } from '@components/cart'
import { UIProvider, useUI } from '@components/ui/context'

interface LayoutProps {
  pageProps: {
    pages?: Page[]
  }
}

interface Props {
  children?: any
  pages?: Page[]
}

const CoreLayout: FC<Props> = ({ children, pages }) => {
  const { displaySidebar, closeSidebar } = useUI()

  return (
    <div className="h-full bg-primary">
      <Featurebar
        title="Free Standard Shipping on orders over $99.99"
        description="Due to COVID-19, some orders may experience processing and delivery delays."
      />
      <Container>
        <Navbar />
      </Container>
      <main className="fit">{children}</main>
      <Footer pages={pages} />
      <Sidebar show={displaySidebar} close={closeSidebar}>
        <CartSidebarView />
      </Sidebar>
    </div>
  )
}

const Layout: FC<LayoutProps> = ({ children, pageProps }) => (
  <CommerceProvider locale="en-us">
    <UIProvider>
      <CoreLayout pages={pageProps.pages}>{children}</CoreLayout>
    </UIProvider>
  </CommerceProvider>
)

export default Layout
