import { FC } from 'react'
import cn from 'classnames'
import { ThemeProvider } from 'next-themes'
import { SSRProvider, OverlayProvider } from 'react-aria'
import type { Page } from '@lib/bigcommerce/api/operations/get-all-pages'
import { Navbar, Featurebar, Footer } from '@components/core'
import { Container, Sidebar } from '@components/ui'
import { CartSidebarView } from '@components/cart'
import { UIProvider, useUI } from '@components/ui/context'
import s from './Layout.module.css'

interface LayoutProps {
  pageProps: {
    pages?: Page[]
  }
}

interface Props {
  pages?: Page[]
}

const CoreLayout: FC<Props> = ({ children, pages }) => {
  const { displaySidebar, closeSidebar } = useUI()

  return (
    <div className={cn(s.root)}>
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
  <ThemeProvider>
    <SSRProvider>
      <OverlayProvider>
        <UIProvider>
          <CoreLayout pages={pageProps.pages}>{children}</CoreLayout>
        </UIProvider>
      </OverlayProvider>
    </SSRProvider>
  </ThemeProvider>
)

export default Layout
