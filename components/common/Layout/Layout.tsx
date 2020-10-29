import cn from 'classnames'
import s from './Layout.module.css'
import { useRouter } from 'next/router'
import { usePreventScroll } from '@react-aria/overlays'
import { FC, useCallback, useEffect, useState } from 'react'
import { useUI } from '@components/ui/context'
import { CartSidebarView } from '@components/cart'
import { Navbar, Featurebar, Footer } from '@components/common'
import { LoginView, SignUpView, ForgotPassword } from '@components/auth'
import { Container, Sidebar, Button, Modal, Toast } from '@components/ui'
import debounce from 'lodash.debounce'

import { CommerceProvider } from '@bigcommerce/storefront-data-hooks'
import type { Page } from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'

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

  usePreventScroll({
    isDisabled: !(displaySidebar || displayModal),
  })

  const handleScroll = useCallback(() => {
    debounce(() => {
      const offset = 0
      const { scrollTop } = document.documentElement
      if (scrollTop > offset) setHasScrolled(true)
      else setHasScrolled(false)
    }, 1)
  }, [])

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <CommerceProvider locale={locale}>
      <div className={cn(s.root)}>
        <header className={cn(s.header, { 'shadow-magical': hasScrolled })}>
          <Container>
            <Navbar />
          </Container>
        </header>
        <main className="fit">{children}</main>
        <Footer pages={pageProps.pages} />

        {/** Aditional UI Components */}
        <Sidebar open={displaySidebar} onClose={closeSidebar}>
          <CartSidebarView />
        </Sidebar>

        <Modal open={displayModal} onClose={closeModal}>
          {modalView === 'LOGIN_VIEW' && <LoginView />}
          {modalView === 'SIGNUP_VIEW' && <SignUpView />}
          {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
        </Modal>

        <Featurebar
          title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
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
