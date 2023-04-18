'use client';

import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import CloseIcon from 'components/icons/close';
import MenuIcon from 'components/icons/menu';
import { Menu } from 'lib/shopify/types';
import Search from './search';

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuIsOpen]);

  useEffect(() => {
    setMobileMenuIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={() => {
          setMobileMenuIsOpen(!mobileMenuIsOpen);
        }}
        aria-label="Open mobile menu"
        className="md:hidden"
        data-testid="open-mobile-menu"
      >
        <MenuIcon className="h-6" />
      </button>
      <Dialog
        open={mobileMenuIsOpen}
        onClose={() => {
          setMobileMenuIsOpen(false);
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex justify-end" data-testid="mobile-menu">
          <Dialog.Panel
            as={motion.div}
            variants={{
              open: { opacity: 1 }
            }}
            className="flex w-full flex-col bg-white pb-6 dark:bg-black"
          >
            <div className="p-4">
              <button
                className="mb-4"
                onClick={() => {
                  setMobileMenuIsOpen(false);
                }}
                aria-label="Close mobile menu"
                data-testid="close-mobile-menu"
              >
                <CloseIcon className="h-6" />
              </button>

              <div className="mb-4 w-full">
                <Search />
              </div>
              {menu.length ? (
                <ul className="flex flex-col">
                  {menu.map((item: Menu) => (
                    <li key={item.title}>
                      <Link
                        href={item.path}
                        className="rounded-lg py-1 text-xl text-black transition-colors hover:text-gray-500 dark:text-white"
                        onClick={() => {
                          setMobileMenuIsOpen(false);
                        }}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
