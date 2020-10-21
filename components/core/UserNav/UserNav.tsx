import { FC, useState } from 'react'
import cn from 'classnames'
import useCart from '@lib/bigcommerce/cart/use-cart'
import { Avatar, Toggle } from '@components/core'
import { Heart, Bag } from '@components/icon'
import { useUI } from '@components/ui/context'
import s from './UserNav.module.css'
import { useTheme } from 'next-themes'
import Link from 'next/link'
interface Props {
  className?: string
}

const countItem = (count: number, item: any) => count + item.quantity

const countItems = (count: number, items: any[]) =>
  items.reduce(countItem, count)

const UserNav: FC<Props> = ({ className }) => {
  const { data } = useCart()
  const { theme, setTheme } = useTheme()
  const [displayDropdown, setDisplayDropdown] = useState(false)
  const { openSidebar, closeSidebar, displaySidebar } = useUI()
  const itemsCount = Object.values(data?.line_items ?? {}).reduce(countItems, 0)

  return (
    <nav className={cn(s.root, className)}>
      <ul className={s.list}>
        <li
          className={s.item}
          onClick={() => (displaySidebar ? closeSidebar() : openSidebar())}
        >
          <Bag />
          {itemsCount > 0 && (
            <span className="border border-accent-1 bg-secondary text-secondary h-4 w-4 absolute rounded-full right-3 top-3 flex items-center justify-center font-bold text-xs">
              {itemsCount}
            </span>
          )}
        </li>
        <Link href="/wishlist">
          <li className={s.item}>
            <Heart />
          </li>
        </Link>
        <li
          className={s.item}
          onClick={() => {
            setDisplayDropdown((i) => !i)
          }}
        >
          <Avatar />
        </li>
      </ul>

      {displayDropdown && (
        <div className={s.dropdownMenu}>
          <nav className={s.dropdownMenuContainer}>
            <Link href="#">
              <a className={s.link}>My Purchases</a>
            </Link>
            <Link href="#">
              <a className={s.link}>My Account</a>
            </Link>
            <span className="inline-flex items-start px-6 py-2">
              <span className="capitalize inline-block mr-2 text-base leading-6 font-medium text-gray-900">
                Theme
              </span>
              <Toggle
                checked={theme === 'dark'}
                onChange={() =>
                  theme === 'dark' ? setTheme('light') : setTheme('dark')
                }
              />
            </span>
            <Link href="#">
              <a className={cn(s.link, 'mt-4')}>Logout</a>
            </Link>
          </nav>
        </div>
      )}
    </nav>
  )
}

export default UserNav
