'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import OpenSearch from './open-search';

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('search');

  return (
    <>
      <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <SheetTrigger aria-label="Open search">
          <OpenSearch />
        </SheetTrigger>
        <SheetContent side="right" className="bg-app">
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">{t('search')}</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
