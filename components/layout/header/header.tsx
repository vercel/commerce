'use client'

import Logo from 'components/ui/logo/logo'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from 'components/ui/navigation-menu'
import Link from 'next/link'
import { FC } from 'react'
import HeaderRoot from './header-root'

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {

  return (
    <HeaderRoot>
      <div className="relative flex flex-col">
        <div className="relative flex items-center w-full justify-between py-2 px-4 h-14 lg:h-16 lg:py-3 lg:px-8 2xl:px-16">

          <div className="flex items-center">
            <Link
              href="/"
              className="cursor-pointer duration-100 ease-in-out absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:relative lg:left-0 lg:top-0 lg:translate-x-0 lg:translate-y-0"
              aria-label="Logo"
            >
              <Logo />
            </Link>
          </div>

          <div className="absolute transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <NavigationMenu delayDuration={0} className="hidden lg:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href={'/kategori/junior'} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Junior
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href={'/kategori/trojor'} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Tröjor
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href={'/kategori/byxor'} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Byxor
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </HeaderRoot>
  )
}

export default Header
