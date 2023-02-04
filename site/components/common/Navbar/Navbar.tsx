import { FC } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import { useDisclosure } from '@chakra-ui/react'
import NavBarFiltersDrawer from './NavBarFiltersDrawer'
import { useRouter } from 'next/router'

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
}

const Navbar: FC<NavbarProps> = ({ links }) => {
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure()

  const { locale, pathname } = useRouter()

  return (
    <>
      <NavBarFiltersDrawer
        onClose={onCloseDrawer}
        isOpen={isOpenDrawer}
      ></NavBarFiltersDrawer>
      <NavbarRoot>
        <Container clean className="mx-auto max-w-8xl px-6">
          <div className={s.nav}>
            <div className="flex items-center flex-1">
              <Link href="/">
                <a className={s.logo} aria-label="Logo">
                  <Logo />
                </a>
              </Link>
              <nav className={s.navMenu}>
                <Link href="/search">
                  <a className={s.link}>
                    {locale === 'it' ? 'Vetrina' : 'Shop'}
                  </a>
                </Link>
                {links?.map((l) => (
                  <Link href={l.href} key={l.href}>
                    {l.label === 'Categories' || l.label === 'Categorie' ? (
                      <a onClick={onOpenDrawer} className={s.link}>
                        {l.label}
                      </a>
                    ) : (
                      <a className={s.link}>{l.label}</a>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
            {process.env.COMMERCE_SEARCH_ENABLED && pathname.includes("search") && (
              <div className="justify-center flex-1 hidden lg:flex">
                <Searchbar />
              </div>
            )}
            <div className="flex items-center justify-end flex-1 space-x-8">
              <UserNav />
            </div>
          </div>
          {process.env.COMMERCE_SEARCH_ENABLED && (
            <div className="flex pb-4 lg:px-6 lg:hidden">
              <Searchbar id="mobile-search" />
            </div>
          )}
        </Container>
      </NavbarRoot>
    </>
  )
}

export default Navbar
