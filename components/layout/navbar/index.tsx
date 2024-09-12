'use client';

import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import Logo from 'components/icons/logo';
import { LiHTMLAttributes, useState } from 'react';

interface MenuListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  type: 'main' | 'sub';
}

function MenuListItem({ type, children }: MenuListItemProps) {
  return (
    <>
      {type === 'main' ? (
        <li className="hover:bg-menuHover/15 px-[10px] py-[15px] hover:rounded-md">{children}</li>
      ) : (
        <li className="p-[10px]">{children}</li>
      )}
    </>
  );
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="absolute left-0 top-0 z-10 flex w-full items-center px-[4.38rem] py-[3.12rem]">
      <div className="flex w-full items-center justify-between">
        {/* burger menu */}
        <button onClick={() => setIsMenuOpen(true)}>
          <Bars3Icon width={24} height={24} color="white" />
        </button>
        {/* logo */}
        <div className="z-10 justify-center md:flex md:w-1/3">
          <Logo />
        </div>
        {/* 3 icons */}
        <div className="flex justify-between gap-[1.88rem]">
          <MagnifyingGlassIcon width={16} height={16} color="white" />
          <UserIcon width={16} height={16} fill="white" color="white" />
          <ShoppingBagIcon width={16} height={16} fill="white" color="white" />
        </div>
      </div>
      {/* Categories menu */}
      {isMenuOpen && (
        <div className="absolute left-0 top-0 h-screen w-full bg-black/75 text-white">
          <div className="flex h-full flex-col items-center justify-start pt-[190px]">
            <div className="grid w-3/4 grid-cols-4 gap-8 text-left text-lightText">
              <ul>
                <MenuListItem type="main">All Brands</MenuListItem>
                <MenuListItem type="main">Special Offers</MenuListItem>
                <MenuListItem type="main">Collectors</MenuListItem>
                <MenuListItem type="main">MenuListItemmited Edition</MenuListItem>
                <MenuListItem type="main">Regional Edition</MenuListItem>
                <MenuListItem type="main">Vintage</MenuListItem>
                <MenuListItem type="main">Accessories</MenuListItem>
              </ul>

              <ul>
                <MenuListItem type="sub">Bolivar</MenuListItem>
                <MenuListItem type="sub">Cohiba</MenuListItem>
                <MenuListItem type="sub">Cuaba</MenuListItem>
                <MenuListItem type="sub">El Rey Del Mundo</MenuListItem>
                <MenuListItem type="sub">Juan Lopez</MenuListItem>
                <MenuListItem type="sub">H. Upmann</MenuListItem>
                <MenuListItem type="sub">Hoyo De Monterrey</MenuListItem>
                <MenuListItem type="sub">La Flor De Cano</MenuListItem>
                <MenuListItem type="sub">La Gloria Cubana</MenuListItem>
                <MenuListItem type="sub">Montecristo</MenuListItem>
                <MenuListItem type="sub">Partagas</MenuListItem>
              </ul>
              <ul>
                <MenuListItem type="sub">Bolivar</MenuListItem>
                <MenuListItem type="sub">Cohiba</MenuListItem>
                <MenuListItem type="sub">Cuaba</MenuListItem>
                <MenuListItem type="sub">El Rey Del Mundo</MenuListItem>
                <MenuListItem type="sub">Juan Lopez</MenuListItem>
                <MenuListItem type="sub">H. Upmann</MenuListItem>
                <MenuListItem type="sub">Hoyo De Monterrey</MenuListItem>
                <MenuListItem type="sub">La Flor De Cano</MenuListItem>
                <MenuListItem type="sub">La Gloria Cubana</MenuListItem>
                <MenuListItem type="sub">Montecristo</MenuListItem>
                <MenuListItem type="sub">Partagas</MenuListItem>
              </ul>
              <ul>
                <MenuListItem type="sub">Bolivar</MenuListItem>
                <MenuListItem type="sub">Cohiba</MenuListItem>
                <MenuListItem type="sub">Cuaba</MenuListItem>
                <MenuListItem type="sub">El Rey Del Mundo</MenuListItem>
                <MenuListItem type="sub">Juan Lopez</MenuListItem>
                <MenuListItem type="sub">H. Upmann</MenuListItem>
                <MenuListItem type="sub">Hoyo De Monterrey</MenuListItem>
                <MenuListItem type="sub">La Flor De Cano</MenuListItem>
                <MenuListItem type="sub">La Gloria Cubana</MenuListItem>
                <MenuListItem type="sub">Montecristo</MenuListItem>
                <MenuListItem type="sub">Partagas</MenuListItem>
              </ul>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
