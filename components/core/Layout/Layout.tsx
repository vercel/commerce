import { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import type { Page } from '@lib/bigcommerce/api/operations/get-all-pages'
import { CommerceProvider } from '@lib/bigcommerce'
import { Navbar, Featurebar, Footer } from '@components/core'
import { Container, Sidebar } from '@components/ui'
import Button from '@components/ui/Button'
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
  const [acceptedCookies, setAcceptedCookies] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const offset = 0
    function handleScroll() {
      const { scrollTop } = document.documentElement
      if (scrollTop > offset) setHasScrolled(true)
      else setHasScrolled(false)
    }
    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <CommerceProvider locale="en-us">
      <div className={cn(s.root)}>
        <header
          className={cn(
            'sticky top-0 bg-primary z-40 transition-shadow duration-200',
            {
              'shadow-magical': hasScrolled,
            }
          )}
        >
          <Container>
            <Navbar />
          </Container>
        </header>
        <main className="fit">{children}</main>
        <Footer pages={pageProps.pages} />
        <Sidebar show={displaySidebar} close={closeSidebar}>
          <CartSidebarView />
        </Sidebar>
        <Featurebar
          title="This site uses cookies to improve your experience."
          description="By clicking, you agree to our Privacy Policy."
          action={
            <Button className="mx-5" onClick={() => setAcceptedCookies(true)}>
              Accept cookies
            </Button>
          }
          className={cn({ ['translate-y-full']: acceptedCookies })}
        />
      </div>
    </CommerceProvider>
  )
}

export default Layout
