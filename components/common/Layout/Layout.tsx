import cn from 'classnames'
import dynamic from 'next/dynamic'
import s from './Layout.module.css'
import { useRouter } from 'next/router'
import debounce from 'lodash.debounce'
import React, { FC, useCallback, useEffect, useState, Suspense } from 'react'
import { useUI } from '@components/ui/context'
import { Navbar, Footer } from '@components/common'
import { usePreventScroll } from '@react-aria/overlays'
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'
import { CommerceProvider } from '@bigcommerce/storefront-data-hooks'
import { Container, Sidebar, Button, Modal, LoadingDots } from '@components/ui'
import type { Page } from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
)

const dynamicProps = {
  loading: () => <Loading />,
}
const CartSidebarView = dynamic(
  () => import('@components/cart/CartSidebarView')
)
const LoginView = dynamic(
  () => import('@components/auth/LoginView'),
  dynamicProps
)
const SignUpView = dynamic(
  () => import('@components/auth/SignUpView'),
  dynamicProps
)
const ForgotPassword = dynamic(
  () => import('@components/auth/ForgotPassword'),
  dynamicProps
)
const FeatureBar = dynamic(
  () => import('@components/common/FeatureBar'),
  dynamicProps
)

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
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  const [hasScrolled, setHasScrolled] = useState(false)
  const { locale = 'en-US' } = useRouter()

  console.log('Layout')

  usePreventScroll({
    isDisabled: !(displaySidebar || displayModal),
  })

  // const handleScroll = useCallback(
  //   debounce(() => {
  //     const offset = 0
  //     const { scrollTop } = document.documentElement
  //     const scrolled = scrollTop > offset

  //     setHasScrolled(scrolled)
  //   }, 1),
  //   []
  // )

  // useEffect(() => {
  //   document.addEventListener('scroll', handleScroll)
  //   return () => {
  //     document.removeEventListener('scroll', handleScroll)
  //   }
  // }, [handleScroll])

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
          {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
        </Modal>
        <FeatureBar
          title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
          hide={acceptedCookies}
          action={
            <Button className="mx-5" onClick={onAcceptCookies}>
              Accept cookies
            </Button>
          }
        />
      </div>
    </CommerceProvider>
  )
}

export default Layout
