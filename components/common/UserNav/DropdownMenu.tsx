import cn from 'classnames'
import Link from 'next/link'
import { FC, useState } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import s from './DropdownMenu.module.css'
import { Avatar } from '@components/common'
import { Moon, Sun } from '@components/icons'
import { useUI } from '@components/ui/context'

import useLogout from '@bigcommerce/storefront-data-hooks/use-logout'
interface DropdownMenuProps {
  open?: boolean
}

const LINKS = [
  {
    name: 'My Orders',
    href: '/orders',
  },
  {
    name: 'My Profile',
    href: '/profile',
  },
  {
    name: 'My Cart',
    href: '/cart',
  },
]

const DropdownMenu: FC<DropdownMenuProps> = ({ open = false }) => {
  const logout = useLogout()
  const { pathname } = useRouter()
  const { theme, setTheme } = useTheme()
  const [display, setDisplay] = useState(false)
  const { closeSidebarIfPresent } = useUI()

  return (
    <div>
      <button
        className={s.avatarButton}
        onClick={() => setDisplay(!display)}
        aria-label="Menu"
      >
        <Avatar />
      </button>

      {display && (
        <ul className={s.dropdownMenu}>
          {LINKS.map(({ name, href }) => (
            <li key={href}>
              <div>
                <Link href={href}>
                  <a
                    className={cn(s.link, {
                      [s.active]: pathname === href,
                    })}
                    onClick={closeSidebarIfPresent}
                  >
                    {name}
                  </a>
                </Link>
              </div>
            </li>
          ))}
          <li>
            <a
              className={cn(s.link, 'justify-between')}
              onClick={() =>
                theme === 'dark' ? setTheme('light') : setTheme('dark')
              }
            >
              <div>
                Theme: <strong>{theme}</strong>{' '}
              </div>
              <div className="ml-3">
                {theme == 'dark' ? (
                  <Moon width={20} height={20} />
                ) : (
                  <Sun width="20" height={20} />
                )}
              </div>
            </a>
          </li>
          <li>
            <a
              className={cn(s.link, 'border-t border-accents-2 mt-4')}
              onClick={() => logout()}
            >
              Logout
            </a>
          </li>
        </ul>
      )}
    </div>
  )
}

export default DropdownMenu
