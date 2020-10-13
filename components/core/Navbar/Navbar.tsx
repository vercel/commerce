import s from './Navbar.module.css'
import { FC } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Logo } from '@components/ui'
import { Searchbar, Toggle, UserNav } from '@components/core'
interface Props {
  className?: string
}

const Navbar: FC<Props> = ({ className }) => {
  const rootClassName = className
  const { theme, setTheme } = useTheme()
  return (
    <div className={rootClassName}>
      <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
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

        <div className="flex flex-initial md:flex-1 justify-end space-x-8">
          <Toggle
            checked={theme === 'dark'}
            onChange={() =>
              theme === 'dark' ? setTheme('light') : setTheme('dark')
            }
          />
          <UserNav />
        </div>
      </div>
      <div className="block flex pb-4 md:hidden px-4 md:px-6">
        <Searchbar />
      </div>
    </div>
  )
}

export default Navbar
