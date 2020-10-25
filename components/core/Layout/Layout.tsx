import { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import type { Page } from '@lib/bigcommerce/api/operations/get-all-pages'
import { CommerceProvider } from '@lib/bigcommerce'
import { CartSidebarView } from '@components/cart'
import { Container, Sidebar, Button, Modal } from '@components/ui'
import { Navbar, Featurebar, Footer } from '@components/core'
import { LoginView, SignUpView } from '@components/auth'
import { useUI } from '@components/ui/context'
import { usePreventScroll } from '@react-aria/overlays'
import s from './Layout.module.css'

interface Props {
  pageProps: {
    pages?: Page[]
  }
}

const Layout: FC<Props> = ({ children, pageProps }) => {
  const {
    displaySidebar,
    displayModal,
    closeSidebar,
    closeModal,
    modalView,
  } = useUI()
  const [acceptedCookies, setAcceptedCookies] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const { locale = 'en-US' } = useRouter()

  // TODO: Update code, add throttle and more.
  // TODO: Make sure to not do any unnecessary updates as it's doing right now
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
    isDisabled: !(displaySidebar || displayModal),
  })

  return (
    <CommerceProvider locale={locale}>
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
        <Modal open={displayModal} onClose={closeModal}>
          {modalView === 'LOGIN_VIEW' && <LoginView />}
          {modalView === 'SIGNUP_VIEW' && <SignUpView />}
        </Modal>
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
