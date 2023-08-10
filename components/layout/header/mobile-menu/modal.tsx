'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import MainMenu from '../main-menu/main-menu';
import OpenMobileMenu from './open-mobile-menu';

interface MobileMenuModalProps {
  locale: string;
}

export default function MobileMenuModal({ locale }: MobileMenuModalProps) {
  const [isOpen, setIsOpen] = useState(false);

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
            <MainMenu locale={locale} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
