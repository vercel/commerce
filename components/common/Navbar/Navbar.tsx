import { FC } from 'react'
import Link from 'next/link'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import NavbarRoot from './NavbarRoot'
import s from './Navbar.module.css'

const Navbar: FC = () => (
  <NavbarRoot>
    <Container>
      <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
        <div className="flex items-center flex-1">
          <Link href="/">
            <a className={s.logo} aria-label="Logo">
              <Logo />
            </a>
          </Link>
          <nav className="hidden ml-6 space-x-4 lg:block">
            <Link href="/search">
              <a className={s.link}>All</a>
            </Link>
            <Link href="/search?q=clothes">
              <a className={s.link}>Clothes</a>
            </Link>
            <Link href="/search?q=accessories">
              <a className={s.link}>Accessories</a>
            </Link>
            <Link href="/search?q=shoes">
              <a className={s.link}>Shoes</a>
            </Link>
          </nav>
        </div>

        <div className="justify-center flex-1 hidden lg:flex">
          <Searchbar />
        </div>

        <div className="flex justify-end flex-1 space-x-8">
          <UserNav />
        </div>
      </div>

      <div className="flex pb-4 lg:px-6 lg:hidden">
        <Searchbar id="mobile-search" />
      </div>
    </Container>
  </NavbarRoot>
)

export default Navbar
