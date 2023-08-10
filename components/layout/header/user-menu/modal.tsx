'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import OpenUserMenu from './open-user-menu';

export default function UserModal() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('auth');

  return (
    <>
      <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <SheetTrigger aria-label="Open search">
          <OpenUserMenu />
        </SheetTrigger>
        <SheetContent side="right" className="bg-app">
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">{t('login.logIn')}</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
