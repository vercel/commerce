import cn from 'classnames'
import React, { FunctionComponent } from 'react'
import s from './Navbar.module.css'
import { Logo, Container } from '@components/ui'
import { Searchbar } from '@components/core'
import { UserNav } from '@components/core'
interface Props {
  className?: string
}

const Navbar: FunctionComponent<Props> = ({ className }) => {
  const rootClassName = cn(s.root, className)
  return (
    <Container className={rootClassName}>
      <Logo />
      <div className="flex flex-row h-full content-center flex-1">
        <Searchbar />
        <nav className="hidden flex-row items-center px-3 lg:flex">
          <a className="pr-4">All</a>
          <a className="pr-4">Clothes</a>
          <a>Accesories</a>
        </nav>
      </div>
      <UserNav />
    </Container>
  )
}

export default Navbar
