import cn from 'clsx'
import Link from 'next/link'
import s from './UserNav.module.css'
import useCart from '@framework/cart/use-cart'
import CustomerMenuContent from './CustomerMenuContent'
import Button from '@components/ui/Button'
import { useUI } from '@components/ui/context'
import { Avatar } from '@components/common'
import { Heart, Bag, Menu } from '@components/icons'
import useCustomer from '@framework/customer/use-customer'
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
  DropdownMenuItem,
} from '@components/ui/Dropdown/Dropdown'

import type { LineItem } from '@commerce/types/cart'

const countItem = (count: number, item: LineItem) => count + item.quantity

const UserNav: React.FC<{
  className?: string
}> = ({ className }) => {
  const { data } = useCart()
  const { data: isCustomerLoggedIn } = useCustomer()
  const {
    toggleSidebar,
    closeSidebarIfPresent,
    openModal,
    setSidebarView,
    openSidebar,
  } = useUI()

  const itemsCount = data?.lineItems.reduce(countItem, 0) ?? 0

  return (
    <nav className={cn(s.root, className)}>
      <ul className={s.list}>
        {process.env.COMMERCE_CART_ENABLED && (
          <li className={s.item}>
            <Button
              className={s.item}
              variant="naked"
              onClick={() => {
                setSidebarView('CART_VIEW')
                toggleSidebar()
              }}
              aria-label={`Cart items: ${itemsCount}`}
            >
              <Bag />
              {itemsCount > 0 && (
                <span className={s.bagCount}>{itemsCount}</span>
              )}
            </Button>
          </li>
        )}
        {process.env.COMMERCE_WISHLIST_ENABLED && (
          <li className={s.item}>
            <Link href="/wishlist">
              <a onClick={closeSidebarIfPresent} aria-label="Wishlist">
                <Heart />
              </a>
            </Link>
          </li>
        )}
        {process.env.COMMERCE_CUSTOMERAUTH_ENABLED && (
          <li className={s.item}>
            {isCustomerLoggedIn ? (
              <Dropdown>
                <div className={s.dropdownDesktop}>
                  <div className={s.dropdownCustomerMenu}>
                    <DropdownTrigger asChild>
                      <button className="inline-flex justify-center rounded-full">
                        <Avatar />
                      </button>
                    </DropdownTrigger>
                    <CustomerMenuContent />
                  </div>
                </div>
                <div className={s.dropdownMobile}>
                  <button
                    className="inline-flex justify-center rounded-full"
                    onClick={() => {
                      openSidebar()
                      setSidebarView('MOBILE_CUSTOMERMENU_VIEW')
                    }}
                  >
                    <Avatar />
                  </button>
                </div>
              </Dropdown>
            ) : (
              <button
                className={s.avatarButton}
                aria-label="Menu"
                onClick={() => openModal()}
              >
                <Avatar />
              </button>
            )}
          </li>
        )}
        <li className={s.mobileMenu}>
          <Button
            className={s.item}
            aria-label="Menu"
            variant="naked"
            onClick={() => {
              openSidebar()
              setSidebarView('MOBILE_MENU_VIEW')
            }}
          >
            <Menu />
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default UserNav
