import { Searchbar, UserNav } from "@components/common";
import { Container, Logo } from "@components/ui";
import Link from "next/link";
import { FC } from "react";
import s from "./Navbar.module.css";
import NavbarRoot from "./NavbarRoot";

interface Link {
  href: string;
  label: string;
}

interface NavbarProps {
  links?: Link[];
}

const Navbar: FC<NavbarProps> = ({ links }) => (
  <NavbarRoot>
    <Container clean className="mx-auto max-w-8xl px-6">
      <div className={s.nav}>
        <div className="flex items-center flex-1">
          <Link href="/">
            <a className={s.logo} aria-label="Logo" data-test="logo">
              <Logo />
            </a>
          </Link>
          <nav
            role="navigation"
            aria-label="Main Navigation"
            className={s.navMenu}
          >
            <Link href="/search">
              <a className={s.link} data-test="nav-link-search">
                All
              </a>
            </Link>
            {links?.map((l) => (
              <Link href={l.href} key={l.href}>
                <a className={s.link} data-test="nav-link-home-page">
                  {l.label}
                </a>
              </Link>
            ))}
          </nav>
        </div>
        {process.env.COMMERCE_SEARCH_ENABLED && (
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
);

export default Navbar;
