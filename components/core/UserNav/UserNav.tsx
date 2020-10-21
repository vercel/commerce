import { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import useCart from '@lib/bigcommerce/cart/use-cart'
import { Avatar } from '@components/core'
import { Heart, Bag } from '@components/icon'
import { useUI } from '@components/ui/context'
import s from './UserNav.module.css'
import Link from 'next/link'
interface Props {
  className?: string
}

const countItem = (count: number, item: any) => count + item.quantity

const countItems = (count: number, items: any[]) =>
  items.reduce(countItem, count)

const UserNav: FC<Props> = ({ className }) => {
  const { data } = useCart()
  const [displayDropdown, setDisplayDropdown] = useState(false)
  const { openSidebar, closeSidebar, displaySidebar } = useUI()
  const itemsCount = Object.values(data?.line_items ?? {}).reduce(countItems, 0)

  useEffect(() => {
    function handleClick(e: any) {
      const isInside = e?.target?.closest(`#user-dropdown`) !== null
      if (isInside) return
      setDisplayDropdown(false)
      document.removeEventListener('click', handleClick)
    }
    function handleKeyPress(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setDisplayDropdown(false)
        document.removeEventListener('keydown', handleKeyPress)
      }
    }

    if (displayDropdown) {
      document.addEventListener('click', handleClick)
      document.addEventListener('keydown', handleKeyPress)
      return () => {
        document.removeEventListener('click', handleClick)
        document.removeEventListener('keydown', handleKeyPress)
      }
    }
  }, [displayDropdown])

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
        <button
          className={cn(
            s.item,
            'rounded-full focus:shadow-outline-blue focus:outline-none'
          )}
          onClick={() => {
            setDisplayDropdown((i) => !i)
          }}
        >
          <Avatar />
        </button>
      </ul>

      {displayDropdown && (
        <div className={cn(s.dropdownMenu, 'shadow-lg')} id="user-dropdown">
          <nav className={s.dropdownMenuContainer}>
            <Link href="#">
              <a className={s.link}>My Purchases</a>
            </Link>
            <Link href="#">
              <a className={s.link}>My Account</a>
            </Link>
            <div className="my-1 h-px w-full bg-accents-2" />
            <Link href="#">
              <a className={cn(s.link)}>Logout</a>
            </Link>
          </nav>
        </div>
      )}
    </nav>
  )
}

export default UserNav
