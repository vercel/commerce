'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next-intl/link';
import { useState } from 'react';
import OpenMobileMenu from './open-mobile-menu';

interface MobileMenuModalProps {
  items: [] | null;
}

export default function MobileMenuModal({ items }: MobileMenuModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!items) {
    return;
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <SheetTrigger aria-label="Open menu">
          <OpenMobileMenu />
        </SheetTrigger>
        <SheetContent side="left" className="bg-app">
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <ul className="flex flex-col gap-2">
              {items.map((item: { title: string; slug: string }, i: number) => {
                return (
                  <li key={i}>
                    <Link onClick={() => setIsOpen(false)} href={`${item.slug}`}>
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
