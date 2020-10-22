import { FC, useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import s from './UserNav.module.css'
import { useTheme } from 'next-themes'
import { Avatar } from '@components/core'
import { Heart, Bag } from '@components/icon'
import { useUI } from '@components/ui/context'
import { FocusScope } from '@react-aria/focus'

import {
  useOverlay,
  DismissButton,
  usePreventScroll,
} from '@react-aria/overlays'
import useCart from '@lib/bigcommerce/cart/use-cart'

interface Props {
  className?: string
}

const countItem = (count: number, item: any) => count + item.quantity
const countItems = (count: number, items: any[]) =>
  items.reduce(countItem, count)

const UserNav: FC<Props> = ({ className, children, ...props }) => {
  const { data } = useCart()
  const { openSidebar, closeSidebar, displaySidebar } = useUI()
  const [displayDropdown, setDisplayDropdown] = useState(false)
  const itemsCount = Object.values(data?.line_items ?? {}).reduce(countItems, 0)
  let ref = useRef() as React.MutableRefObject<HTMLInputElement>

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

  const toggleDropdown = () => setDisplayDropdown((v) => !v)
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
            <li className={s.item}>
              <Heart />
            </li>
          </Link>
          <li className={s.item} onClick={toggleDropdown}>
            <Avatar />
          </li>
        </ul>
      </div>
      <DismissButton onDismiss={() => setDisplayDropdown(false)} />
      {displayDropdown && (
        <DropdownMenu
          onClose={() => setDisplayDropdown(false)}
          innerRef={ref}
        />
      )}
    </nav>
  )
}

interface DropdownMenuProps {
  onClose: () => void
  innerRef: React.MutableRefObject<HTMLInputElement>
}

const DropdownMenu: FC<DropdownMenuProps> = ({
  onClose,
  children,
  innerRef,
  ...props
}) => {
  const { theme, setTheme } = useTheme()

  let { overlayProps } = useOverlay(
    {
      onClose: onClose,
      isOpen: true,
    },
    innerRef
  )

  usePreventScroll()
  return (
    <FocusScope contain restoreFocus autoFocus>
      <div className={cn(s.dropdownMenu)} ref={innerRef} {...overlayProps}>
        <nav className={s.dropdownMenuContainer}>
          <Link href="#">
            <a className={s.link}>My Purchases</a>
          </Link>
          <Link href="#">
            <a className={s.link}>My Account</a>
          </Link>
          <a
            className={s.link}
            onClick={() =>
              theme === 'dark' ? setTheme('light') : setTheme('dark')
            }
          >
            Theme: <strong>{theme}</strong>
          </a>
          <Link href="#">
            <a className={cn(s.link, 'border-t border-accents-2 mt-4')}>
              Logout
            </a>
          </Link>
        </nav>
      </div>
    </FocusScope>
  )
}

export default UserNav
