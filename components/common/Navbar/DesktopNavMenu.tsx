import { FC,  } from 'react'
import s from './DesktopNavMenu.module.css'
import Link from 'next/link'

interface Link {
  href: string
  label: string
}
interface DesktopNavMenuProps {
  links?: Link[]
}

const DesktopNavMenu: FC<DesktopNavMenuProps> = ({ links }) => {
  return (
    <nav className={s.navMenu}>
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

export default DesktopNavMenu
