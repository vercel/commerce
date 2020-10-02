import cn from 'classnames'
import React, { FunctionComponent } from 'react'
import s from './Layout.module.css'
import { Navbar, Featurebar } from '@components/core'
import { Container, Sidebar } from '@components/ui'
import { CartSidebarView } from '@components/cart'
import { useUI } from '@components/ui/context'

interface Props {
  className?: string
  children?: any
}

const Layout: FunctionComponent<Props> = ({ className, children }) => {
  const rootClassName = cn(s.root, className)
  const { displaySidebar } = useUI()
  return (
    <div className={rootClassName}>
      <Featurebar
        title="Free Standard Shipping on orders over $99.99"
        description="Due to COVID-19, some orders may experience processing and delivery delays."
      />
      <Container>
        <Navbar />
        <main className="h-screen">{children}</main>
      </Container>
      {displaySidebar && (
        <Sidebar>
          <CartSidebarView />
        </Sidebar>
      )}
    </div>
  )
}

export default Layout
