import cn from 'classnames'
import { FC } from 'react'
import s from './Layout.module.css'
import { Navbar, Featurebar, Footer } from '@components/core'
import { Container, Sidebar } from '@components/ui'
import { CartSidebarView } from '@components/cart'
import { useUI } from '@components/ui/context'

import { CommerceProvider } from '@lib/bigcommerce'
interface Props {
  className?: string
  children?: any
}

const Layout: FC<Props> = ({ className, children }) => {
  const rootClassName = cn(s.root, className)
  const { displaySidebar, closeSidebar } = useUI()

  return (
    <div className={rootClassName}>
      <Featurebar
        title="Free Standard Shipping on orders over $99.99"
        description="Due to COVID-19, some orders may experience processing and delivery delays."
      />
      <Container>
        <Navbar />
      </Container>
      <main className="fit">{children}</main>
      <Footer />
      <Sidebar show={displaySidebar} close={closeSidebar}>
        <CartSidebarView />
      </Sidebar>
    </div>
  )
}

export default Layout
