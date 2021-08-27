import { FC, useState } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import MenuButton from './MenuButton'
import DesktopNavMenu from './DesktopNavMenu'
import MobileNavMenu from './MobileNavMenu'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'

interface Link {
  href: string
  label: string
}
interface NavbarProps {
  links?: Link[]
}

const Navbar: FC<NavbarProps> = ({ links }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <NavbarRoot>
      <div className={s.navContainer}>
        <Container>
          <div className={s.nav}>
            <div className="flex items-center flex-1">
              <Link href="/">
                <a className={s.logo} aria-label="Logo">
                  <Logo />
                </a>
              </Link>
              <DesktopNavMenu links={links} />
            </div>
            <MenuButton
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            <div className="flex items-center justify-end flex-1 space-x-8">
              <UserNav />
            </div>
          </div>
        </Container>
      </div>
      {process.env.COMMERCE_SEARCH_ENABLED && (
        <div className={s.searchContainer}>
          <Container>
            <Searchbar />
          </Container>
        </div>
      )}
      <MobileNavMenu links={links} isOpen={isMenuOpen} />
    </NavbarRoot>
  )
}

export default Navbar
