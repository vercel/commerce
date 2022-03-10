import s from './DropdownCustomerAuth.module.css'
import cn from 'clsx'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Moon, Sun } from '@components/icons'
import useLogout from '@framework/auth/use-logout'
import { useRouter } from 'next/router'

import { DropdownMenuItem } from '@components/ui/Dropdown/Dropdown'

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

export default function CustomerMenuContent() {
  const logout = useLogout()
  const { pathname } = useRouter()
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    router.push(href)
  }

  return (
    <div>
      {LINKS.map(({ name, href }) => (
        <DropdownMenuItem key={href}>
          <a
            onClick={(e) => handleClick(e, href)}
            className={cn(s.link, {
              [s.active]: pathname === href,
            })}
          >
            {name}
          </a>
        </DropdownMenuItem>
      ))}
      <DropdownMenuItem>
        <a
          className={cn(s.link, 'justify-between')}
          onClick={() => {
            theme === 'dark' ? setTheme('light') : setTheme('dark')
          }}
        >
          <div>
            Theme: <strong>{theme}</strong>{' '}
          </div>
          <div className="ml-3">
            {theme == 'dark' ? (
              <Moon width={20} height={20} />
            ) : (
              <Sun width={20} height={20} />
            )}
          </div>
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <a
          className={cn(s.link, 'border-t border-accent-2 mt-4')}
          onClick={() => logout()}
        >
          Logout
        </a>
      </DropdownMenuItem>
    </div>
  )
}
