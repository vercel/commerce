import cn from 'classnames'
import { FC } from 'react'
import s from './Navbar.module.css'
import { Logo, Container } from '@components/ui'
import { Searchbar } from '@components/core'
import { UserNav } from '@components/core'
import Link from 'next/link'
interface Props {
  className?: string
}

const Navbar: FC<Props> = ({ className }) => {
  const rootClassName = cn(s.root, className)
  return (
    <Container className={rootClassName}>
      <Link href="/">
        <h1 className="cursor-pointer">
          <Logo />
        </h1>
      </Link>
      <div className="flex flex-row h-full content-center flex-1 ml-10">
        <nav className="hidden flex-row items-center px-6 lg:flex space-x-4">
          <a className={s.link}>All</a>
          <a className={s.link}>Clothes</a>
          <a className={s.link}>Accesories</a>
        </nav>
        <Searchbar />
      </div>
      <UserNav />
    </Container>
  )
}

export default Navbar
