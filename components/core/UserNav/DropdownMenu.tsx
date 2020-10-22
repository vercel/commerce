import { FC } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import cn from 'classnames'
import s from './DropdownMenu.module.css'
import { Moon, Sun } from '@components/icon'
import { Menu } from '@headlessui/react'
interface DropdownMenuProps {
  onClose: () => void
}

const DropdownMenu: FC<DropdownMenuProps> = ({
  onClose,
  children,

  ...props
}) => {
  const { theme, setTheme } = useTheme()
  return (
    <nav className={cn(s.dropdownMenu)}>
      <Menu.Items className={s.dropdownMenuContainer}>
        <Menu.Item>
          {({ active }) => <a className={s.link}>My Purchases</a>}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => <a className={s.link}>My Account</a>}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
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
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a className={cn(s.link, 'border-t border-accents-2 mt-4')}>
              Logout
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </nav>
  )
}

export default DropdownMenu
