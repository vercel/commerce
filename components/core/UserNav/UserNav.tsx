import Link from 'next/link'
import cn from 'classnames'
import s from './UserNav.module.css'
import { FC, useRef } from 'react'

import { Avatar } from '@components/core'
import { Heart, Bag } from '@components/icon'
import { useUI } from '@components/ui/context'
import DropdownMenu from './DropdownMenu'

import useCart from '@lib/bigcommerce/cart/use-cart'

interface Props {
  className?: string
}

const countItem = (count: number, item: any) => count + item.quantity
const countItems = (count: number, items: any[]) =>
  items.reduce(countItem, count)

const UserNav: FC<Props> = ({ className, children, ...props }) => {
  const { data } = useCart()
  const {
    openSidebar,
    closeSidebar,
    displaySidebar,
    displayDropdown,
    openDropdown,
    closeDropdown,
  } = useUI()

  const itemsCount = Object.values(data?.line_items ?? {}).reduce(countItems, 0)
  let ref = useRef() as React.MutableRefObject<HTMLInputElement>

  return (
    <nav className={cn(s.root, className)}>
      <div className={s.mainContainer}>
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
            <li className={cn(s.item, s.heart)}>
              <Heart />
            </li>
          </Link>
          <li
            className={s.item}
            onClick={() => (displayDropdown ? closeDropdown() : openDropdown())}
          >
            <Avatar />
          </li>
        </ul>
      </div>

      {displayDropdown && (
        <DropdownMenu onClose={closeDropdown} innerRef={ref} />
      )}
    </nav>
  )
}

export default UserNav
