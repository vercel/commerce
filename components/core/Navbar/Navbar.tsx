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
  const rootClassName = className
  return (
    <div className={rootClassName}>
      <Container>
        <div className="flex justify-between align-center flex-row px-6 py-4 md:py-6 relative">
          <div className="flex flex-1 items-center">
            <Link href="/">
              <a className="cursor-pointer">
                <Logo />
              </a>
            </Link>
            <nav className="space-x-4 ml-6 hidden md:block">
              <Link href="/">
                <a className={s.link}>All</a>
              </Link>
              <Link href="/">
                <a className={s.link}>Clothes</a>
              </Link>
              <Link href="/">
                <a className={s.link}>Accessories</a>
              </Link>
            </nav>
          </div>

          <div className="md:flex flex-1 justify-center hidden">
            <Searchbar />
          </div>

          <div className="flex flex-initial md:flex-1 justify-end">
            <UserNav />
          </div>
        </div>
        <div className="block flex pb-4 md:hidden px-6">
          <Searchbar />
        </div>
      </Container>
    </div>
  )
}

export default Navbar
