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
    <div className={rootClassName}>
      <Container>
        <div className={s.container}>
          <Link href="/">
            <span className="flex-0 cursor-pointer">
              <Logo />
            </span>
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
        </div>
      </Container>
    </div>
  )
}

export default Navbar
