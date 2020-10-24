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
import { usePreventScroll } from '@react-aria/overlays'
interface Props {
  pageProps: {
    pages?: Page[]
  }
}

const Layout: FC<Props> = ({ children, pageProps }) => {
  const { displaySidebar, displayDropdown, closeSidebar } = useUI()
  const [acceptedCookies, setAcceptedCookies] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  // TODO: Update code, add throttle and more.
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

  usePreventScroll({
    isDisabled: !displaySidebar,
  })

  return (
    <CommerceProvider locale="en-us">
      <div className={cn(s.root)}>
        <header
          className={cn(
            'sticky top-0 bg-primary z-40 transition-all duration-150',
            { 'shadow-magical': hasScrolled }
          )}
        >
          <Container>
            <Navbar />
          </Container>
        </header>
        <main className="fit">{children}</main>
        <Footer pages={pageProps.pages} />

        <Sidebar open={displaySidebar} onClose={closeSidebar}>
          <CartSidebarView />
        </Sidebar>

        <Featurebar
          title="This site uses cookies to improve your experience."
          description="By clicking, you agree to our Privacy Policy."
          hide={acceptedCookies}
          action={
            <Button className="mx-5" onClick={() => setAcceptedCookies(true)}>
              Accept cookies
            </Button>
          }
        />
      </div>
    </CommerceProvider>
  )
}

export default Layout
