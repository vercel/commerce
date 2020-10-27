import { FC } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import cn from 'classnames'
import s from './DropdownMenu.module.css'
import { Moon, Sun } from '@components/icons'
import { useUI } from '@components/ui/context'
import { Menu, Transition } from '@headlessui/react'
import useLogout from '@bigcommerce/storefront-data-hooks/use-logout'
import { useRouter } from 'next/router'

interface DropdownMenuProps {
  open: boolean
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
  const { theme, setTheme } = useTheme()
  const logout = useLogout()
  const { pathname } = useRouter()

  const { closeSidebarIfPresent } = useUI()

  return (
    <Transition
      show={open}
      enter="transition ease-out duration-150 z-20"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className={s.dropdownMenu}>
        {LINKS.map(({ name, href }) => (
          <Menu.Item key={href}>
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
          </Menu.Item>
        ))}
        <Menu.Item>
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
        </Menu.Item>
        <Menu.Item>
          <a
            className={cn(s.link, 'border-t border-accents-2 mt-4')}
            onClick={() => logout()}
          >
            Logout
          </a>
        </Menu.Item>
      </Menu.Items>
    </Transition>
  )
}

export default DropdownMenu
