import { FC } from 'react'
import s from './MobileNavMenu.module.css'
import Link from 'next/link'
import cn from 'classnames'

interface Link {
  href: string
  label: string
}
interface MobileNavMenuProps {
  links?: Link[]
  isOpen: boolean
}

const MobileNavMenu: FC<MobileNavMenuProps> = ({ links, isOpen }) => {
  return (
    <nav className={cn(s.navMenu, { [s.isOpen]: isOpen })}>
      <Link href="/search">
        <a className={s.link}>All</a>
      </Link>
      {links?.map((l) => (
        <Link href={l.href} key={l.href}>
          <a className={s.link}>{l.label}</a>
        </Link>
      ))}
    </nav>
  )
}

export default MobileNavMenu
